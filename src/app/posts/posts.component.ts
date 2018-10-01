import { Component, OnInit } from '@angular/core';

import { TumblrService } from '../tumblr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  tumblrName: string;
  tumblrTag: string;
  posts: any[];
  // result: any;

  constructor(private tumblrService: TumblrService) { }

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
      this.posts = result.posts;
    })
    .catch(error => {
      console.error(error);
    });

  }

  formatTag(tag: string): string[] {
    return tag.split(' ');
  }

}
