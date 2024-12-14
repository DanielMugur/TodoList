import { AfterViewInit, Component, Directive, Inject, ViewChild, inject, model } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';
import { environment } from '@environment';
import { Todo } from '../Models/Todo';
import { TodoAppService } from '../Services/TodoApp.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AppTodoListComponent } from '../app-todo-list/app-todo-list.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgIf, NgFor, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatSortModule],
  templateUrl: 'todo-list.component.html',
  styleUrl: 'todo-list.component.css'
})
export class TodoListComponent {
  private TodoServicio = inject(TodoAppService);
  private TodoFormDialog = inject(MatDialog);
  public todoList: Todo[] = [];
  public TodoTableColumns: string[] = ['id', 'Task', 'dueDate', 'Notes', 'isDone', 'Actions']
 

  constructor(private router: Router) {
    this.GetTaskList();
  }

  GetTaskList() {
    this.TodoServicio.GetList().subscribe({
      next: (result) => {
        this.todoList = result;
      },
      error: (error) => { console.log(error); }
    })
  }

  OpenDialogTodo(Task: Todo): void {
    var Modal = this.TodoFormDialog.open(AppTodoListComponent, {
      data: {
        id: Task.id,
        text: Task.text,
        isDone: Task.isDone,
        dueDate: Task.dueDate,
        notes: Task.notes
      }
    });
    Modal.afterClosed().subscribe(Task => {
      this.GetTaskList();
    })
  }

  OpenDialogEmpty(): void {
    var Modal = this.TodoFormDialog.open(AppTodoListComponent, {
      data: {
        id: 0,
        text: '',
        isDone: false,
        dueDate: null,
        notes: ''
      }
    });
    Modal.afterClosed().subscribe(Task => {
      this.GetTaskList();
    })
  }

  //NewTask() {
  //  this.router.navigate(['*/app-todo-list', 0]);
  //}

  //EditTask(Task: Todo) {
  //  this.router.navigate(['*/app-todo-list', Task.id]);
  //}

  DeleteTask(Task: Todo) {
    if (confirm("Are you sure you want to delete the task: " + Task.text)) {
      this.TodoServicio.DeleteTask(Task.id).subscribe({
        next: (result) => {
          if (result) {
            this.GetTaskList();
          }
          else {
            alert("Unable to delete Task");
          }
        },
        error: (error) => { console.log(error); }
      })
    }
  }

  CompleteTask(Task: Todo) {
    Task.isDone = this.ChangeStateTask(Task.isDone);
    this.TodoServicio.UpdateTask(Task).subscribe({
      next: (result) => {
        if (result) {
          this.GetTaskList();
        }
      },
      error: (error) => { console.log(error); }
    })
  }

  UnCompleteTask(Task: Todo) {
    Task.isDone = this.ChangeStateTask(Task.isDone);
    this.TodoServicio.UpdateTask(Task).subscribe({
      next: (result) => {
        if (result) {
          this.GetTaskList();
        }
      },
      error: (error) => { console.log(error); }
    })
  }

  ChangeStateTask(isDone: boolean): boolean {
    return isDone = !isDone;
  }
}
