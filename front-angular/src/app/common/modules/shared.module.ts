import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckInputBlankDirective } from 'src/app/common/directive/check-input-blank/check-input-blank.directive';
import { RestrictWhiteSpaceDirective } from 'src/app/common/directive/restrict-whitespace/restrict-white-space.directive';
import { SafeHtmlPipe } from '../pipe/safe-html/safe-html.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';
import { FocusInvalidInputDirective } from '../directive/focus-invalid-input/focus-invalid-input.directive';
import { OnlyDecimalNumbersDirective } from '../directive/only-decimal-numbers.directive';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';

@NgModule({
  declarations: [
    CheckInputBlankDirective,
    RestrictWhiteSpaceDirective,
    SafeHtmlPipe,
    BreadcrumbsComponent,
    SkeletonComponent,
    FocusInvalidInputDirective,
    OnlyDecimalNumbersDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CheckInputBlankDirective,
    RestrictWhiteSpaceDirective,
    SafeHtmlPipe,
    BreadcrumbsComponent,
    SkeletonComponent,
    FocusInvalidInputDirective,
    OnlyDecimalNumbersDirective
  ],
  providers: [
  ],

})
export class SharedModule { }
