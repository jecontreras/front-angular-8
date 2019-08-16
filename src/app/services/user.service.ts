import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { FactoryModelService } from './factory-model.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  private handleError: any;
  constructor(
    private _http: HttpClient,
    private _model: FactoryModelService
  ) {
    this.url = GLOBAL.url;
 }
  login(user: any) {
    user.app = this.adsSecuryty();
    return this._model.query('user/login', user);
  }
  register(user: any) {
    user.app = this.adsSecuryty();
    return this._model.create('user/register', user);
  }
  private adsSecuryty() {
    return 'pruebaroot';
  }
}
