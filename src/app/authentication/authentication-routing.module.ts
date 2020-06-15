import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login3Component } from './login-3/login-3.component';


const routes: Routes = [
    {
        path: 'login',
        component: Login3Component,
        data: {
            title: 'Login 3'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
