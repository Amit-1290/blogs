import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  
  breadCrumbLinks = [];
  ghostBreadcrumb = 1;
  
  constructor(
    private commonService:CommonService
  ) { }
  
  ngOnInit(): void {

    setTimeout(() => {
      this.ghostBreadcrumb = 0;  
    }, 1000);
    this.breadCrumbLinks = this.commonService.getBreadCrumbInfo();
  }

}
