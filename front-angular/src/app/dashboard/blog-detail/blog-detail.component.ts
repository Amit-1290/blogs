import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomService } from 'src/app/common/services/custom.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogDetail = {
    id : "",
    slug : "",
    blog_categories: [],
    title: "",
    description: "",
    createdAt: ""
  };

  params  = {
    slug: ""
  };
  
  constructor(
    protected customService : CustomService,
    private route:ActivatedRoute,
    public commonService:CommonService
  ) { }

  ngOnInit() {

    const params = this.route.paramMap.subscribe(params => {
      this.params.slug = params.get("slug");
    });
    
    
    this.getBlogDetail()

  }

  getBlogDetail() {

    this.customService.getBlogDetail({ slug : this.params.slug }).subscribe((result) => {
      if (result.status) {

        this.blogDetail = result.result.blogInfo;

        // if (result.result.userBlogs) {

        //   result.result.userBlogs.forEach(v => {
        //     this.blogList.push(v);
        //   });
        //   this.hasMorePage = result.result.hasMore;
        // }
        // if(this.invitePlayerSearchUsersText == '')
        // {
        //   this.blogList = [];
        //   // this.searchPlayerPage =1;
        //   // this.searchPlayerLastPage =1;
        // }
        // this.isSearchLoading =0;
      }
      // this.isSearchLoading =0;

    });
  }
}
