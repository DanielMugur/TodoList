import { NgFor, NgIf } from "@angular/common";
import { Component, Inject, Input, OnInit, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from "@angular/router";
import { TodoAppService } from "../Services/TodoApp.service";
import { MatCardModule } from '@angular/material/card';
import { Todo } from "../Models/Todo";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core'

@Component({
  selector: 'app-new-todo-list',
  standalone: true,
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule, MatDialogActions, MatDialogClose, NgIf, NgFor, ReactiveFormsModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: 'app-todo-list.component.html',
  styleUrl: 'app-todo-list.component.css'
})
export class AppTodoListComponent implements OnInit{

  private TodoServicio = inject(TodoAppService);
  public FormBuilder = inject(FormBuilder);
  private TodoFormDialog = inject(MatDialog);
  readonly TaskInjected = inject<Todo>(MAT_DIALOG_DATA);
  isTaskNew = this.TaskInjected?.id | 0;
  hasTextError: boolean = false;
  hasDateError: boolean = false;

  public formTask: FormGroup = this.FormBuilder.group({
    Id: [0],
    Task: ['', Validators.required],
    DueDate: ['', Validators.required],
    Notes: ['']
  });

  constructor(private router: Router) { }


  ngOnInit(): void {
    if (this.TaskInjected.id != 0) {
      this.formTask.patchValue({
        Id: this.TaskInjected.id,
        Task: this.TaskInjected.text,
        DueDate: new Date(this.TaskInjected.dueDate),
        Notes: this.TaskInjected.notes
      })
    }
  }

  CreateTask() {
    const Task: Todo = {
      id: this.TaskInjected?.id | 0,
      text: this.formTask.value.Task,
      isDone: false,
      dueDate: this.formTask.value?.DueDate ? this.formTask.value?.DueDate.toLocaleDateString() : null,
      notes: this.formTask.value.Notes
    }
    if (this.DataValidation(Task)) {
      this.TodoServicio.CreateTask(Task).subscribe({
        next: (result) => {
          if (result) {
            alert("Task created correctly");
            this.CloseModal();
          }
          else {
            alert("There has been an error");
            this.CloseModal();
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      alert("Data not Valid");
    }
  }

  SaveTask() {
    const Task: Todo = {
      id: this.TaskInjected.id,
      text: this.formTask.value.Task,
      isDone: this.TaskInjected.isDone,
      dueDate: this.formTask.value.DueDate?.toLocaleDateString(),
      notes: this.formTask.value.Notes
    }
    if (this.DataValidation(Task)) {
      this.TodoServicio.UpdateTask(Task).subscribe({
        next: (result) => {
          if (result) {
            alert("Task updated correctly");
            this.CloseModal();
          }
          else {
            alert("There has been an error");
            this.CloseModal();
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      alert("Data not Valid");
    }
  }

  CloseModal() {
    this.TodoFormDialog.closeAll();
  }

  DiscardChange() {
    this.TodoFormDialog.closeAll();
  }

  DataValidation(Task: Todo): boolean {
    let isDataValid: boolean = true;
    if (Task.text) { }
    else {
      this.hasTextError = true;
      isDataValid = false;
    }
    if (Task.dueDate) { }
    else {
      this.hasTextError = true;
      isDataValid = false;
    }
    return isDataValid;
  }
}
