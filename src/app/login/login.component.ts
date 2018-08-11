import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { first } from 'rxjs/operators';
import { Router,RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
//import { Response } from '@angular/json';

@Injectable()
export class ConfigService {
  constructor(
    private http: HttpClient,
    private router: Router
  ){ }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ){ }

login(loginUser : string, password : string){
    this.loginValidate(loginUser,password).subscribe( res => {
      console.log(res);
      //console.log(res.todoRes.user);
      if(new String(res.status) == "OK"){
            this.router.navigate(['/todo', { user: loginUser}]);
        //  this.router.navigateByUrl('/todo;user=naren180891@gmail.com')
          }
    });

  }

loginValidate(loginUser : string, password : string):  Observable<HttpResponse<any>> {

        var body ={
          user: loginUser,
          password: password
        };

        const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

          return this.http.post<any>('http://localhost:3000/signin', body, httpOptions);
      }

  ngOnInit() {
  }

}
