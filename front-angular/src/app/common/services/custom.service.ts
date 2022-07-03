import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommonRepository } from '../repositories/common.repository';
@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(private commonRepository: CommonRepository) { }

  public login(body): Observable<any> {
    return this.commonRepository.login(body);
  }

  public signup(body): Observable<any> {
    return this.commonRepository.signup(body);
  }

  public logout(body): Observable<any> {
    return this.commonRepository.logout(body);
  }

  public getBlogList(body): Observable<any> {
    return this.commonRepository.getBlogList(body);
  }

  public getBlogDetail(body): Observable<any> {
    return this.commonRepository.getBlogDetail(body);
  }

  public storeAndUpdateBlogDetail(body): Observable<any> {
    return this.commonRepository.storeAndUpdateBlogDetail(body);
  }

  public getAllCategories(body): Observable<any> {
    return this.commonRepository.getAllCategories(body);
  }

  public deleteBlog(body): Observable<any> {
    return this.commonRepository.deleteBlog(body);
  }

  
  
  

}
