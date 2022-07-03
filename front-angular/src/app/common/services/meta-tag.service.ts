import { timeout } from 'rxjs/operators';
import { Injectable,Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SeoService } from './seo.service';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class MetaTagService implements CanActivate {
  constructor(public seoService: SeoService,
              public router: Router,
              @Inject(DOCUMENT) private document: Document) {

              }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.seoService.setTitle(route.data.title);
    this.seoService.addMetaDescription(route.data.description);

    return true;
  }
}
