import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../_interface/todo';
import { Eventping } from 'src/app/_interface/eventping';
import { DataService } from '../../_service/data.service';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {

  @Input() toDo: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dataService: DataService) {}

   changeCheck(event?: any): void {
     this.toDo.status = !this.toDo.status;
     this.dataService.putToDo(this.toDo).subscribe((data: Todo)=> {
      const eventObject: Eventping = {
        label: 'check',
        object: this.toDo
      };
      this.ping.emit(eventObject);
    }, error => {
      console.log(`ERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
   }

   changeLabel(event?: any): void {
    this.dataService.putToDo(this.toDo).subscribe((data: Todo)=> {
      const eventObject: Eventping = {
        label: 'label',
        object: this.toDo
      };
      this.ping.emit(eventObject);
    }, error => {
      console.log(`ERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
   }

   deleteToDo(event?: any): void {
    this.dataService.deleteToDo(this.toDo).subscribe((data: Todo)=> {
      const eventObject: Eventping = {
        label: 'delete',
        object: this.toDo
      };
      this.ping.emit(eventObject);
    }, error => {
      console.log(`ERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
   }

  ngOnInit(): void {
  }

}
