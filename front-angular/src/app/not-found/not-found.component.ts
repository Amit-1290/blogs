import { CommonService } from 'src/app/common/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private commonService : CommonService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.commonService.headerDisabled = 0;
  }

  goToDashboard(){
    if(!this.commonService.isUserLogin())
    {
      this.commonService.headerDisabled = 1;
    }
    
    this.router.navigate(['/']);
  }

}
