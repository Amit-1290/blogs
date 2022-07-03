import { Component } from '@angular/core';
import { CommonService } from './common/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'admin';
  constructor(public commonService:CommonService) {
    //this.isShowHeaderAndFooter = 0;
  }
}
