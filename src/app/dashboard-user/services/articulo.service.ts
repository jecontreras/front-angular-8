import { Injectable } from '@angular/core';
import { FactoryModelService } from './../../services/factory-model.service'

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  cuerpo: any = {};
  constructor(
    private _model: FactoryModelService
  ) {
    this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('articulo', query);
  }
  create (query: any){
    return this._model.create('articulo', query);
  }
  edit(query:any){
    return this._model.update('articulo', query.id, query);
  }
  delete(query:any){
    return this._model.delete('articulo', query.id, query);
  }
}
