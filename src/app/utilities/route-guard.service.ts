import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(
    public baseService: BaseService,
    public route: Router,
  ) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.baseService.check().subscribe((response) => {
        if (response.status === 100) {
          resolve(true);
        } else {
          this.baseService.logout();
          this.route.navigate(['/']);
          resolve(false);
        }
      }, (error) => {
        error.title = 'User check';
        resolve(false);
        this.baseService.logout();
        this.route.navigate(['/']);
        throw (error);
      });
    });
  }
}
