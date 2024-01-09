import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private Router: Router) {
  }

  ngOnInit(): void {
    if(this.Router.url == '/administrativo'){
      this.Router.navigate(['administrativo/dashboard']);
    }
  }
}