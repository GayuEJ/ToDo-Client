import { Routes, RouterModule } from '@angular/router';
//import { RegisterComponent } from './register';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [

  //  { path: 'register', component: RegisterComponent },
    { path: 'todo', component: TodoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // // otherwise redirect to home
     { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
