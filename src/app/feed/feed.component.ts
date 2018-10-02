import { Component, OnInit } from '@angular/core';

import { TumblrService } from '../tumblr.service';
import { FavoritesService } from '../favorites/favorites.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  tumblrName: string = "";
  tumblrTag: string = "";
  posts: any[];
  inputError: string;

  constructor(private tumblrService: TumblrService, public sanitizer: DomSanitizer, private favoritesService: FavoritesService) { }

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
      this.inputError = "Please enter a name, tag, or both.";
    }

    if (result) {
      this.inputError = '';

      result.then((result: any) => {
        console.log(result);
        if (result.blog) { // blog name queries have this object, pure tag queries dont
          this.posts = result.posts;
        } else {
          this.posts = result;
        }
      })
      .catch(error => {
        this.inputError = "Error trying to retrieve posts. Please check the name and try again.";
      });
    }
  }

  formatTag(tag: string): string[] {
    return tag.split(' ');
  }

  postFavorited(post: any) {
    this.favoritesService.hasPost(post.id) ?
    this.favoritesService.removePost(post) :
    this.favoritesService.addPost(post);
  }

}
