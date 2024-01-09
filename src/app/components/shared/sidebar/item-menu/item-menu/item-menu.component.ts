import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
  }
}
