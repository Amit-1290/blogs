import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isDefined } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  // Note: When you add new meta tags add it into remove removePreviousRouteTags() method
  // so when you change route automatically that meta remove from page.

  constructor(private titleService:Title,
              private meta:Meta) {
  }

  setTitle(title)
  {
    this.titleService.setTitle(title);
  }

  addMetaDescription(description)
  {
    this.meta.addTag({name: 'description', content: description});
  }

  addOgMetaTags(title, description?, url?, image?)
  {
    let tags = [
      {name: 'og:type', content: 'article'},
      {name: 'og:title', content: description}
    ];

    if(isDefined(description))
    {
      tags.push({name: 'og:description', content: description});
    }

    if(isDefined(image))
    {
      tags.push({name: 'og:image', content: image});
    }

    if(isDefined(url))
    {
      tags.push({name: 'og:url', content: url});
    }

    this.meta.addTags(tags);
  }

  addTwitterMetaTags(title, description?, image?)
  {
    let tags = [
      {name: 'twitter:title', content: title},
    ];

    if(isDefined(description))
    {
      tags.push({name: 'twitter:description', content: description});
    }

    if(isDefined(image))
    {
      tags.push({name: 'twitter:image', content: image});
    }

    this.meta.addTags(tags);
  }

  removePreviousRouteTags()
  {
    this.titleService.setTitle('');
    this.meta.removeTag('name=description');
    this.meta.removeTag('name=og:image');
    this.meta.removeTag('name=og:type');
    this.meta.removeTag('name=og:title');
    this.meta.removeTag('name=og:description');
    this.meta.removeTag('name=twitter:title');
    this.meta.removeTag('name=twitter:description');
    this.meta.removeTag('name=twitter:image');
  }
}
