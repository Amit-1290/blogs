import { Component, OnInit } from '@angular/core'; 
  
import { HostListener } from "@angular/core"; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrWidth = window.innerWidth;
  } 
  isUserMenuShow : boolean =false;
  constructor( 
    private customService : CustomService,
    public commonService:CommonService,
    public router:Router,
    private toastrService:ToastrService,
  ) { }
  currentMenuId = "";
  isOpenSubMenu : boolean;
  isEnableMobileSubMenu : boolean =  false;
  ngOnInit() {
  }

  toggleUserMenu(isUserMenuShow)
  {
    this.isUserMenuShow = !isUserMenuShow;
  }


  logout()
  {
    this.customService.logout({}).subscribe(
      (result) => {
        this.router.navigate(['/']);
        this.commonService.clearUserDetails();
        this.toastrService.success(result.message);
      },
      (error) => {
      });
  }
}
