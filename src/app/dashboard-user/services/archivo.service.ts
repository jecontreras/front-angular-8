import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FactoryModelService } from '../../services/factory-model.service'
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  constructor(
    private _model: FactoryModelService
  ) {
  }
  pushfile(obj: any) {
    const
      form = new FormData()
    ;
    // console.log(obj);
    if (obj) {
      form.append('file', obj[0]);
      return this._model.create('articulo/file', form)
      .pipe(
        map((res: any)=>{
          // console.log(res);
          if(res[0]){
            const
              url:any = _.split(res[0].fd,"images", 10)
            ;
            // console.log(url);
            return this._model.url+"images"+url[1];
          }
          return res;
        })
      )
      ;
    }
  }
  deletefile(query: any) {
    if (query) {
      return this._model.query('articulo/deletefile', query)
      ;
    }
  }
}
