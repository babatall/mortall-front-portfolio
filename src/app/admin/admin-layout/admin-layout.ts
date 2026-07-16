import { Component } from '@angular/core';
import {AuthService} from '../../core/services/AuthService';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

    constructor( private authService: AuthService ) {

    }
    logout() {
      this.authService.logout();
    }
}
