import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../_interface/todo';
import { } from '../../_interface/eventping';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {

  public toDo: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.toDo = {
      label: undefined,
      status: false,
      position: undefined
    }
   }

  ngOnInit(): void {
  }

  public createToDo(event?: any): void {
    this.ping.emit(this.toDo);
    this.toDo = {
      label: undefined,
      status: false,
      position: undefined
    }
  }

}
