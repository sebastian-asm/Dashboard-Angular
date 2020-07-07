import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  userLogin: string;

  constructor(private router: Router, private login: LoginService) {}

  ngOnInit(): void {
    this.login.getAuth().subscribe((resp) => {
      if (resp) {
        this.isLogin = true;
        this.userLogin = resp.email;
      } else {
        this.isLogin = false;
      }
    });
  }

  logout() {
    this.isLogin = false;
    this.login.logout();
    this.router.navigateByUrl('/login');
  }
}
