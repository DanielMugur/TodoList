import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { ResponseAPI } from "../Models/StatusResponse";
import { Todo } from "../Models/Todo";

@Injectable({
  providedIn: 'root'
})
export class TodoAppService {
  private http = inject(HttpClient);
  private apiUrl: string = environment.baseUrl + '/Todos';

  constructor() { }

  GetList() {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  CreateTask(Task: Todo) {
    return this.http.post<ResponseAPI>(this.apiUrl, Task);
  }

  UpdateTask(Task: Todo) {
    return this.http.put<ResponseAPI>(this.apiUrl, Task);
  }

  DeleteTask(id: number) {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
export class Response implements ResponseAPI {
    isSuccesful: boolean = false;
}
