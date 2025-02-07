import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path: 'mould',
        canActivate: [authGuard],
        loadComponent: () =>
        import("./pages/mould/mould.component").then((component)=>component.MouldComponent)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: '**', redirectTo: '/login' }
];
