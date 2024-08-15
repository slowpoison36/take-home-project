import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from '../models/Post';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  public getAllPosts(): Observable<Post[]> {
    const url = `${environment.apiUrl}/posts`;
    return this.http
      .get<Post[]>(url)
      .pipe(catchError((err) => throwError(() => err)));
  }
}
