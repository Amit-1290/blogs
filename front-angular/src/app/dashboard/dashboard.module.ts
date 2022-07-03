import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { SharedModule } from '../common/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';


@NgModule({
  declarations: [DashboardComponent, BlogDetailComponent, AddBlogComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InfiniteScrollModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    CKEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class DashboardModule { }
