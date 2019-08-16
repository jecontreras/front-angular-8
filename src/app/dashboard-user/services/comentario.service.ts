import { Injectable } from '@angular/core';
import { FactoryModelService } from './../../services/factory-model.service'

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  constructor(
    private _model: FactoryModelService
  ) {
  }
  get(query: any){
    return this._model.query('comentario', query);
  }
  create (query: any){
    return this._model.create('comentario', query);
  }
  edit(query:any){
    return this._model.update('comentario', query.id, query);
  }
  delete(query:any){
    return this._model.delete('comentario', query.id, query);
  }
}
