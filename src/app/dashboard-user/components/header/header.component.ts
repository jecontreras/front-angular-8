import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './../../../services/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    location.href = GLOBAL.urlFront;
  }

}
