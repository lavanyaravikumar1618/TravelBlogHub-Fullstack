// src/app/service/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private base = '/api/admin/users'; // adjust if needed

  constructor(private http: HttpClient) {}

  getUsers(page = 1, limit = 10, search = ''): Observable<PagedResponse<User>> {
    let params = new HttpParams().set('page', String(page)).set('limit', String(limit));
    if (search) params = params.set('search', search);
    return this.http.get<PagedResponse<User>>(this.base, { params });
  }

  updateUser(id: string, payload: Partial<User>) {
    return this.http.put<User>(`${this.base}/${id}`, payload);
  }

  deleteUser(id: string) {
    return this.http.delete<{ message: string }>(`${this.base}/${id}`);
  }

  toggleBan(id: string, ban: boolean) {
    return this.http.post(`${this.base}/${id}/ban`, { ban });
  }

  changeRole(id: string, role: string) {
    return this.http.post(`${this.base}/${id}/role`, { role });
  }
}
