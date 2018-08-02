import { Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ToDo-Client';
  todos : any[] = [];


  constructor(
    private http: HttpClient){ }

getHeroes (): Observable<any> {
      return this.http.get<any>('http://localhost:3000/todos/Naren',httpOptions)
    }



// addTodo(todoName): Observable<any[]> {
//
//   return this.http.post<any[]>('http://localhost:3000/todo', todoName, httpOptions)
// }
addTodo(todoText : string):  Observable<any[]> {
console.log("canme inside")

      var body ={
        user: 'Naren',
        todoName: todoText,
        todoStatus: false
      };

      const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
        return this.http.post<any[]>('http://localhost:3000/todo', body, httpOptions)
    }

deleteTodos(event ,index : number):  Observable<any[]> {

          var user='Naren'
          const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
            return this.http.delete<any[]>('http://localhost:3000/todo/'+this.todos[index]._id+'/'
            +user, httpOptions)
        }
updateTodos(event ,index : number, todoDone : boolean):  Observable<any[]> {
        console.log("canme inside")

                  var body ={
                    user: 'Naren',
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
      this.todos=res.todoList;
    });
  });
}

deleteTodo(event ,index : number){
  console.log(this.todos[index])
  this.deleteTodos(event,index).subscribe( res => {
    this.getHeroes().subscribe( res => {
      this.getHeroes().subscribe( res => {
        this.todos=res.todoList;
      });
    });
  });
}

ngOnInit(){

this.getHeroes().subscribe( res => {
  console.log(res)
  this.todos=res.todoList;
});

// addTodo(todoName, todoStatus) {
//
//   var body ={
//     todoName: todoName,
//     todoStatus: todoStatus
//   };
//
//   const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
//     return this.http.post('http://localhost:3000/todo', body, httpOptions).subscribe(result => {
//       console.log(result);
//     }, error => console.log('There was an error: '));
// }


  // // when submitting the add form, send the text to the node API
  // $scope.createTodo = function() {
  // console.log($scope.formData)
  //   $http.post('/api/todos', $scope.formData)
  //     .success(function(data) {
  //       $scope.formData = {}; // clear the form so our user is ready to enter another
  //       $scope.todos = data;
  //       console.log(data);
  //     })
  //     .error(function(data) {
  //       console.log('Error: ' + data);
  //     });
  // };
  //
  // // delete a todo after checking it
  // $scope.deleteTodo = function(id) {
  //   $http.delete('/api/todos/' + id)
  //     .success(function(data) {
  //       $scope.todos = data;
  //     })
  //     .error(function(data) {
  //       console.log('Error: ' + data);
  //     });
  // };

}

}
