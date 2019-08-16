import { Component, OnInit } from '@angular/core';
import { FactoryModelService } from '../../../services/factory-model.service';
import { ArticuloService } from '../../services/articulo.service';
import { ArchivoService } from '../../services/archivo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {

  public list: any = [];
  public vistdisibled: boolean = false;
  public dataForm: FormGroup;
  public datafile: any = [];
  public clone:any = {};
  public carga: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private _model: FactoryModelService,
    private _articulo: ArticuloService,
    private _archivo: ArchivoService
  ) {
  }
  ngOnInit() {
    this.getListart();
    this.resetvariable();
  }
  getListart(){
    return this._articulo.get({
      where:{
        user: this._model.user.id
      }
    })
    .subscribe(
      (res:any)=>{
        res = res.data;
        this.list = res;
      }
    )
    ;
  }
  open(obj: any){
    this.vistdisibled = !this.vistdisibled;
    if(obj){
      this.dataForm.patchValue(obj);
      this.clone = _.clone(obj);
    }else{
      this.clone = {};
      this.resetvariable();
    }
  }
  resetvariable(){
    this.dataForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      user: [this._model.user.id],
      file: [''],
      foto: [''],
      description: ['']
    });
    this.datafile=[];
  }
  onCreate(){
    return this._articulo.create(this.dataForm.value)
    .subscribe(
      (response: any)=>{
        // console.log(response);
        if(response){
          Swal.fire('Creado!');
          this.vistdisibled = !this.vistdisibled;
          this.resetvariable();
          this.list.push(response);
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
    ;
  }
  delete(obj:any, idx:number){
    return this._articulo.delete(obj)
    .subscribe(
      (res:any)=>{
        // console.log(res);
        if(res){
          Swal.fire('Eliminado');
          this.list.splice(idx, 1);
        }
      }
    )
    ;
  }
  datafiles(ev: any) {
    if(ev){
      this.datafile = ev.target.files;
      this.file();
    }
  }
  file() {
    const
      file:any = this.datafile
      ;
    this.carga = false;
    this._archivo.pushfile(file)
      .subscribe(
        (data: any) => {
          // console.log('POST Request is successful ', data);
          if(data){
            this.dataForm.patchValue({ foto: data });
          }
          this.carga = true;
        },
        (error: any) => {
          console.log('Error', error);
          this.carga = true;
          Swal.fire('Error al subir la imagen');
        }
      );
  }
  blur(obj:any){
    const
      data:any = this.dataForm.value
    ;
    if(this.clone.id){
      const
        query:any = {
          id: this.clone.id,
          description: data.description,
          foto: data.foto,
          titulo: data.titulo
        };
      this._articulo.edit(query)
      .subscribe(
        (res:any)=>{
          // console.log(res);
          if(res){
            const
              idx:any = _.findIndex(this.list, ['id', res.id])
            ;
            Swal.fire('Actualizado');
            if(idx >-1){
              this.list[idx]=res;
            }
          }
        }
      );
    }
  }
}
