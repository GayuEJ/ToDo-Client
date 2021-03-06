import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { first } from 'rxjs/operators';
import { Router, RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
//import { Response } from '@angular/json';

@Injectable()
export class ConfigService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
/*
  register(userEmail: string, password: string) {
    this.registerUser(userEmail, password).subscribe(res => {
      console.log(res);
    });
    this.router.navigate(['/login']);
  }
*/
register(userEmail: string, password: string) {
  if(userEmail == '' || userEmail === undefined|| password == '' || password === undefined)
  {
    errorMsg.push("please enter email/password ");
     }
 else
 {
    this.registerUser(userEmail, password).subscribe(res => {
      console.log(res);
      if (new String(res.status) == "200") {
        this.router.navigate(['/login']);
        //  this.router.navigateByUrl('/todo;user=naren180891@gmail.com')
      }if(new String(res.status) == "400"){
        alert("UserName Already Exists, please choose new one");
        return false;
      }
    });

    return false;
}
}

  registerUser(userEmail: string, password: string): Observable<any> {

    var body = {
      user: userEmail,
      password: password
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<any>('http://nodejs-ex-test3.192.168.99.100.nip.io/register', body, httpOptions)
    // .pipe(map(response => {
    //   if(response.status == 200)
    //       return response;
    // }));
  }

  ngOnInit() {
  }

}
