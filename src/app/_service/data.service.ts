import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../_interface/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = 'http://localhost:3000';

  constructor( private http: HttpClient) { }

  //GET
  public getToDo(): Observable<Todo[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get<Todo[]>(`${this.serverUrl}/todos`, httpOptions);
  }

  //POST
  public postToDo(object: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<Todo>(`${this.serverUrl}/todos`, object, httpOptions);
  }

  //DELETE
  public deleteToDo(object: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete<Todo>(`${this.serverUrl}/todos/${object.id}`, httpOptions);
  }

  //PUT
  public putToDo(object: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put<Todo>(`${this.serverUrl}/todos/${object.id}`, object, httpOptions);
  }

}
