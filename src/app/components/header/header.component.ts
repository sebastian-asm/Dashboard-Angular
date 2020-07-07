import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  userLogin: string;
  permitirSignup: boolean;

  constructor(
    private router: Router,
    private login: LoginService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.login.getAuth().subscribe((resp) => {
      if (resp) {
        this.isLogin = true;
        this.userLogin = resp.email;
      } else {
        this.isLogin = false;
      }
    });

    // Obteniendo el estado para permitir nuevo registro o no
    this.configService
      .getConfig()
      .subscribe((resp) => (this.permitirSignup = resp.permitirRegistro));
  }

  logout() {
    this.isLogin = false;
    this.login.logout();
    this.router.navigateByUrl('/login');
  }
}
