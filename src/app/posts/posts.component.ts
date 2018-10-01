import { Component, OnInit } from '@angular/core';

import { TumblrService } from '../tumblr.service';
import { Observable } from 'rxjs';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  tumblrName: string = "memewhore";
  tumblrTag: string;
  posts: any[];
  // result: any;

  constructor(private tumblrService: TumblrService, public sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  search() {
    let result: Promise<Object>;
    if (this.tumblrName && this.tumblrTag) {
      result = this.tumblrService.searchByNameAndTag(this.tumblrName, this.formatTag(this.tumblrTag));
    } else if (this.tumblrName && !this.tumblrTag) {
      result = this.tumblrService.searchByName(this.tumblrName);
    } else if (!this.tumblrName && this.tumblrTag) {
      result = this.tumblrService.searchByTag(this.formatTag(this.tumblrTag));
    } else {
      console.log('no input');
    }

    result.then((result: any) => {
      console.log(result);
      if (result.blog) { // blog name queries have this object, pure tag queries dont
        this.posts = result.posts;
      } else {
        this.posts = result;
      }
    })
    .catch(error => {
      console.error(error);
    });

  }

  formatTag(tag: string): string[] {
    return tag.split(' ');
  }

  trustHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

}
