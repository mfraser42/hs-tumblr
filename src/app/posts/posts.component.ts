import { Component, OnInit } from '@angular/core';

import { TumblrService } from '../tumblr.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  tumblrName: string;
  tumblrTag: string;

  constructor(private tumblrService: TumblrService) { }

  ngOnInit() {

  }

  search(): Observable<any> {
    return this.tumblrService.search(this.tumblrName, this.tumblrTag)
  }

}
