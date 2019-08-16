import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { ComentarioService } from '../../services/comentario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FactoryModelService } from '../../../services/factory-model.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {
  public list:any = [];
  public comentForm: FormGroup;
  public user: any={};
  public disabledcoment:boolean = false;
  public actived:boolean = false;
  public cuerpo:any = {};

  constructor(
    private _articulo: ArticuloService,
    private _model:FactoryModelService,
    private _comentario: ComentarioService,
    private formBuilder: FormBuilder
  ) {
    this.getListart();
    this._model.loadUser();
  }

  ngOnInit() {
    this.user = this._model.user;
    this.comentForm = this.formBuilder.group({
      id: [''],
      comentario: ['', Validators.required],
      user: [this._model.user.id],
      articulo: ['', Validators.required]
    });
  }
  getListart(){
    return this._articulo.get({})
    .subscribe(
      (res:any)=>{
        res = res.data;
        _.forEach(res, (item:any)=>{
          return this._comentario.get({
            where:{
              articulo: item.id
            }
          })
          .subscribe(
            (rta:any)=>{
              rta = rta.data;
              if(rta){
                item.comentario = rta;
              }
            }
          );
        })
        ;
        this.list = res;
      }
    )
    ;
  }

  onSubmitComentario(obj:any){
    if(obj){
      this.comentForm.patchValue({ articulo: obj.id });
      const
        data:any = this.comentForm.value
      ;
      if(!this.comentForm.value.id){
        delete data.id;
        return this._comentario.create(data)
        .subscribe(
          (res: any)=>{
            if(res){
              if(!obj.comentario){
                obj.comentario = [];
              }
              Swal.fire('Comentado');
              obj.comentario.push(res);
              this.comentForm.patchValue({ comentario: '' });
              this.comentForm.patchValue({ articulo: '' });
            }
          }
        );

      }else{
        const
          query:any = {
            id: data.id,
            comentario: data.comentario
          }
        ;
        return this._comentario.edit(query)
        .subscribe(
          (res: any)=>{
            if(res){
            Swal.fire('Actualizado Comentario');
              this.cuerpo.comentario = res.comentario;
              this.comentForm.patchValue({ comentario: res.comentario });
            }
          }
        );
      }
    }
  }
  deleteComen(obj: any, idx:number, idx1:number){
    if(obj){
      return this._comentario.delete({
        id: obj.id
      })
      .subscribe(
        (res:any)=>{
          if(res){
            Swal.fire('Eliminado');
            this.list[idx].comentario.splice(idx1,1);
          }
        }
      );
    }
  }

}
