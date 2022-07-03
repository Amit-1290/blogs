import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class CommonRepository {

  constructor(private httpClient: HttpClient) { }

  public login(body): Observable<any> {
    return this.httpClient.post(API.LOGIN, body).pipe(
      map(res => res ? res : undefined)
    );
  }

  public signup(body): Observable<any> {
    return this.httpClient.post(API.SIGNUP, body).pipe(
      map(res => res ? res : undefined)
    );
  }


  public logout(body): Observable<any> {
    return this.httpClient.post(API.LOGOUT, body).pipe(
      map(res => res ? res : undefined)
    );
  }

  public getBlogList(body): Observable<any> {
    return this.httpClient.post(API.BLOG_LIST, body).pipe(
      map(res => res ? res : undefined)
    );
  }

  public getBlogDetail(body): Observable<any> {
    return this.httpClient.post(API.BLOG_DETAIL, body).pipe(
      map(res => res ? res : undefined)
    );
  }

  public storeAndUpdateBlogDetail(body): Observable<any> {
    return this.httpClient.post(API.STORE_BLOG_DETAIL, body).pipe(
      map(res => res ? res : undefined)
    );
  }

  public getAllCategories(body): Observable<any> {
    return this.httpClient.post(API.GET_CATEGORIES, body).pipe(
      map(res => res ? res : undefined)
    );
  }

  public deleteBlog(body): Observable<any> {
    return this.httpClient.post(API.DELETE_BLOG, body).pipe(
      map(res => res ? res : undefined)
    );
  }
  
  
}
