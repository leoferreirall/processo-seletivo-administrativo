import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public usuario: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.pegarUsuarioLogado();
  }

  private pegarUsuarioLogado(){
    var token = this.getToken();
    const decoded: any = jwt_decode(token);
    this.usuario = decoded.Username;
  }
  getToken() {
    return this.getUser()?.token;
  }
  getUser() {
    return localStorage.getObject('user');
  }
}
