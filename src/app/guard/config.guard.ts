import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigGuard implements CanActivate {
  constructor(private router: Router, private configService: ConfigService) {}

  canActivate(): Observable<boolean> {
    return this.configService.getConfig().pipe(
      map((resp) => {
        if (!resp.permitirRegistro) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    );
  }
}
