import { Component, OnInit } from '@angular/core';
import { CustomService } from '../common/services/custom.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blogList = [];
  hasMorePage = 0;
  blogPage = 1;
  dateRange :any;
  public rulesAndRegulationEditor = ClassicEditor;

  constructor(
    protected customService: CustomService,
    private toastrService: ToastrService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getBlogs(this.blogPage);
  }

  getBlogs(page) {

    this.customService.getBlogList({page : this.blogPage ,'dateRange' : this.dateRange  }).subscribe((result) => {
      if (result.status) {

        if (result.result.userBlogs) {

          result.result.userBlogs.forEach(v => {
            this.blogList.push(v);
          });
          this.hasMorePage = result.result.hasMore;
        }
      }

    });
  }

  viewMoreBlogs() {

    this.blogPage++;

    if (this.hasMorePage) {
      this.getBlogs(this.blogPage);
    }
  }

  deleteBlog(blogId,ind)
  {
    this.customService.deleteBlog({ id : blogId }).subscribe((result) => {
      if (result.status) {
        this.blogList.splice(ind);
        this.blogPage =1;
        this.blogList = [];
        this.getBlogs(1);
        this.toastrService.success(result.message);

      }   
    });

  }

  filterBlogs()
  {
    this.blogPage =1;
    this.blogList = [];
    this.getBlogs(1);
  }


}
