import { Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
};

@Component({
  selector: "todo-component",
  templateUrl: 'todo.component.html'})
export class TodoComponent implements OnInit{
  title = 'ToDo-Client';
  todos : any[] = [];
  user : string;


  constructor(
    private http: HttpClient,
   private route: ActivatedRoute){ }

getHeroes (): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:3000/todos/'+this.user,httpOptions)
    }


addTodo(todoText : string):  Observable<any[]> {
console.log("came inside")

      var body ={
        user: this.user,
        todoName: todoText,
        todoStatus: false
      };

      const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
        return this.http.post<any[]>('http://localhost:3000/todo', body, httpOptions)
    }

deleteTodos(event ,index : number):  Observable<any[]> {

          var user=this.user
          const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
            return this.http.delete<any[]>('http://localhost:3000/todo/'+this.todos[index]._id+'/'
            +user, httpOptions)
        }
updateTodos(event ,index : number, todoDone : boolean):  Observable<any[]> {
        console.log("came inside")

                  var body ={
                    user: this.user,
                    todoName: this.todos[index].todoName,
                    todoStatus: todoDone
                  };

                  const httpOptions = {
                  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                };
                    return this.http.put<any[]>('http://localhost:3000/todo', body, httpOptions)
                }

addTodos(todoText : string){
  console.log(todoText)
  this.addTodo(todoText).subscribe( res => {
    console.log(res)
  });
}

updateTodo(event ,index : number, todoDone : boolean){
  console.log(this.todos[index])
  this.updateTodos(event,index,todoDone).subscribe( res => {
    this.getHeroes().subscribe( res => {
      this.todos=res;
    });
  });
}

deleteTodo(event ,index : number){
  console.log(this.todos[index])
  this.deleteTodos(event,index).subscribe( res => {
    this.getHeroes().subscribe( res => {
      this.getHeroes().subscribe( res => {
        this.todos=res;
      });
    });
  });
}

ngOnInit(){

let user = this.route.snapshot.paramMap.get('user');
console.log(user)
this.user=user

  // this.route.paramMap.pipe(
  //   switchMap((params: ParamMap) => {
  //     // (+) before `params.get()` turns the string into a number
  //     console.log(params.get('user'));
  //     this.getHeroes().subscribe( res => {
  //       console.log(res)
  //
  //       //this.todos=res.todoList;
  //     });
  //     //return null
  //   })
  // );
  this.getHeroes().subscribe( res => {
    console.log(res)
    this.todos=res;
  });


}

}
