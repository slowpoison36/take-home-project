import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  forkJoin,
  map,
  Observable,
  of,
  take,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { Post, PostRequest } from '../models/Post';

@Injectable({ providedIn: 'root' })
export class PostService {
  public cachedPost = new BehaviorSubject<Post[]>([]);
  private cachedUsers = new BehaviorSubject<Array<any>>([]);
  constructor(private http: HttpClient) {}

  private getAllPosts(): Observable<Post[]> {
    const url = `${environment.apiUrl}/posts`;
    return this.http.get<Post[]>(url).pipe(
      tap((result) => {
        this.cachedPost.next(result);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  private getAllUsers(): Observable<any> {
    const url = `${environment.apiUrl}/users`;
    return this.http.get<any[]>(url).pipe(
      map((users) => {
        return users.map((user) => ({
          name: user.name,
          userId: user.id,
          userName: user.username,
        }));
      }),
      tap((users) => this.cachedUsers.next(users)),
      catchError((err) => throwError(() => err))
    );
  }

  public getPostsAndUserDetails(): Observable<any> {
    const posts$ = this.getAllCurrentPosts().pipe(catchError(() => of([])));
    const users$ = this.getAllCurrentUsers().pipe(catchError(() => of([])));
    return combineLatest([posts$, users$]).pipe(
      take(1),
      map(([posts, users]) => {
        return posts.map((post) => {
          const userDetail = users.find(
            (user: any) => user.userId === post.userId
          );
          return {
            ...post,
            ...userDetail,
          };
        });
      })
    );
  }

  public addPost(postRequest: PostRequest): Observable<Post> {
    const url = `${environment.apiUrl}/posts`;
    return this.http
      .post<Post>(url, postRequest)
      .pipe(
        tap((result) => {
          const posts = this.cachedPost.value.length
            ? [result, ...this.cachedPost.value]
            : [];

          this.cachedPost.next(posts);
        })
      )
      .pipe(catchError((err) => throwError(() => err)));
  }

  public getAllCurrentPosts(): Observable<Post[]> {
    if (this.cachedPost.value.length) {
      return this.cachedPost.asObservable();
    }
    return this.getAllPosts();
  }

  public getAllCurrentUsers(): Observable<any> {
    if (this.cachedUsers.value.length) {
      return this.cachedUsers.asObservable();
    }
    return this.getAllUsers();
  }
}
