import { Injectable } from '@angular/core';
import { CommonRepository } from '../repositories/common.repository';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  headerDisabled = 0;

  constructor(
    private commonRepository: CommonRepository,
    private toastrService: ToastrService,
    private router: Router,
    ) { }

  /**
   * Local Storage methods
   * @param key
   */
  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  deleteLocalStorage(key) {
    return localStorage.removeItem(key);
  }

  deleteAllLocalStorage() {
    return localStorage.clear();
  }

  getAccessToken()
  {
    return this.getLocalStorage('BlogAccessToken');
  }

  clearUserDetails() {
    this.deleteLocalStorage('BlogAccessToken');
    this.deleteLocalStorage('BlogUserDetail');
    var myItem = localStorage.getItem('rememberMeData');
    localStorage.clear();
    if(myItem != null)
    {
      localStorage.setItem("rememberMeData", myItem);
    }
  }

   getUserDetails()
  {
    if(this.getLocalStorage('BlogUserDetail'))
    {
      return JSON.parse(this.getLocalStorage('BlogUserDetail'));
    }

    return {};
  }

  getUserName()
  {
    if(this.getLocalStorage('BlogUserDetail'))
    {
      let userDetail = JSON.parse(this.getLocalStorage('BlogUserDetail'));
      if(userDetail.name != '')
      {
        return userDetail.name;
      }
      return 'Test';
    }

    return 'Test';
  }


  isUserLogin()
  {
    const userDetails = this.getUserDetails();

    return (Object.keys(userDetails).length == 0)  ? 0 : 1;
  }

  validateImageFileSize(size) {
    let imageSizeInMb = Math.floor(size / 1024 / 1024);
    if (imageSizeInMb < 1) return true;
    else {
      this.toastrService.error('Image size should be less then 1MB');
      return false;
    }
  }


  checkHeightAndWidthProper(actualHeight,actualWidth,needHeight,needWidth)
  {
    if(needHeight == actualHeight && actualWidth == needWidth)
    {
      return true;
    }
    this.toastrService.error('Image height/width need '+needHeight+'/'+needWidth+' and image height is'+actualHeight+'/'+actualWidth);
    return 0;
  }

  validateImageFileFormat(name: String) {
    let ext = name.substring(name.lastIndexOf('.') + 1);

    if (
      ext.toLowerCase() == 'jpg' ||
      ext.toLowerCase() == 'jpeg' ||
      ext.toLowerCase() == 'png'
    )
      return true;
    else {
      this.toastrService.error('Image type not supported');
      return 0;
    }
  }

  validateVideoFileSize(size) {
    debugger;
    let vedioSizeInMb = Math.floor(size / 1024 / 1024);
    if (vedioSizeInMb < 50) return true;
    else {
      this.toastrService.error('Video size should be less then 50MB');
      return 0;
    }
  }

  scrollToTop()
  {
    window.scrollTo(0, 0);
  }

  getBreadCrumbInfo()
  {
    return  JSON.parse(localStorage.getItem('breadCrumbInfo') );
  }
  
  
  getPathToName(path)
  {
    return path.replace(/^.*[\\\/]/, '');
  }

  getFileNameToExtension(fileName,type)
  {
    return  type+'/'+fileName.split('.').pop();
  }


  getLoginUserId() {
    if (this.isUserLogin()) {
      const BlogUserDetails = JSON.parse(this.getLocalStorage('BlogUserDetail'));
      return BlogUserDetails.id;
    }
    return 0;
  }
  
}
