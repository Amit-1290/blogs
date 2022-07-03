import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpConfigInterceptor} from './common/repositories/httpconfig.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { MetaTagService } from './common/services/meta-tag.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';
import { CustomFormsModule } from 'ng2-validation';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from './common/modules/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    PaginationModule.forRoot(),
    TooltipModule,
    NgxLoaderIndicatorModule.forRoot(),
    CustomFormsModule,
    SlickCarouselModule,
    PerfectScrollbarModule,
    CommonModule,
    SharedModule,
    NgxDropzoneModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    MetaTagService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
