import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { notebook } from '../components/interfaces/notebook.interface';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private apiUrl = 'http://localhost:3000/api/notebooks'; // Change this to your actual API URL

  constructor(private http: HttpClient) { }

  getApiUrl(): string{
    return this.apiUrl;
  }

  createNotebook(notebook: notebook): Observable<notebook> {
    return this.http.post<notebook>(`${this.apiUrl}`, notebook);
  }

  updateNotebook(id: string, notebook: notebook): Observable<notebook> {
    return this.http.put<notebook>(`${this.apiUrl}/${id}`, notebook);
  }

  deleteNotebook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  fetchAllNotebooks(): Observable<notebook[]> {
    return this.http.get<notebook[]>(this.apiUrl);
  }

  fetchNotebookById(id: string): Observable<notebook> {
    return this.http.get<notebook>(`${this.apiUrl}/${id}`);
  }
}
