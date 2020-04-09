import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../_interface/todo';
import { Eventping } from '../_interface/eventping';
import { DataService } from '../_service/data.service';
import { Subscription } from 'rxjs';

import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit, OnDestroy {

  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public toDos: Todo[];
  public toDosDone: Todo[];
  public subs = new Subscription();

  constructor(
    public dataService: DataService,
    public dragulaService: DragulaService
  ) {
    this.toDoShow = true;
    this.toDoDoneShow = false;
    this.loadData();

    this.dragulaService.createGroup('todosGroup', {
      removeOnSpill: false
    });

    this.subs.add(dragulaService.drop('todosGroup').subscribe(({ el }) => {
        this.position();
      })
    );
    
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  position(): void {
    let position = 0;
    this.toDos.forEach((toDoData: Todo) => {
      console.log("Label: " + toDoData.label + " Position: " + toDoData.position)
        position++;
        toDoData.position = position;
        this.dataService.putToDo(toDoData).subscribe((data: Todo) => {
        console.log(`${data.label} pos: ${data.position} wurde erfolgreich positioniert`)
      }, error => {
        console.log(`ERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
    })
  }

  loadData(): void {
    this.toDos = [];
    this.toDosDone = [];
    this.dataService.getToDo().subscribe((data: Todo[])=> {
      data.forEach((toDo: Todo) => {
        if (toDo.status === true) {
          this.toDosDone.push(toDo);
        } else {
          this.toDos.push(toDo);
        }
      });
      this.toDos.sort((obj1, obj2) => {
        return obj1.position - obj2.position;
      });
    }, error => {
      console.log(`ERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
  }

  create(event: Todo): void {
   event.position = this.toDos.length + 1;
   this.dataService.postToDo(event).subscribe((data: Todo)=> {
    this.toDos.push(data);
  }, error => {
    console.log(`ERROR: ${error.message}`, `color: red; font-size: 12px;`);
  });
  }

  update(event: Eventping): void {
    if ('check' === event.label) {
      if (!event.object.status) {
        this.toDosDone.splice(this.toDosDone.indexOf(event.object), 1);
        this.toDos.push(event.object);
      } else {
        this.toDos.splice(this.toDos.indexOf(event.object), 1);
        this.toDosDone.push(event.object);
      }
    }
    if ('delete' === event.label) {
      if (event.object.status) {
        this.toDosDone.splice(this.toDosDone.indexOf(event.object), 1);
      } else {
        this.toDos.splice(this.toDos.indexOf(event.object), 1)
      }
    }
    if ('label' === event.label) {
      if (event.object.status) {
        this.toDosDone.forEach((toDo: Todo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label;
          }
        });
      } else {
        this.toDos.forEach((toDo: Todo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label;
          }
        });
      }
    }
  }

}
