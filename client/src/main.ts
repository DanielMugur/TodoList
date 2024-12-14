import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { TodoListComponent } from './app/todo-list/todo-list.component';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppTodoListComponent } from './app/app-todo-list/app-todo-list.component';

const routes: Routes = [
  { path: '**', redirectTo: 'todo-list' },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'app-todo-list/:id', component: AppTodoListComponent }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes, withComponentInputBinding()), importProvidersFrom(HttpClientModule), provideAnimationsAsync()],
}).catch((err) => console.error(err));
