import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FavoritesService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public posts: any[] = [];


  constructor(public sanitizer: DomSanitizer, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.posts = this.favoritesService.getPosts();
  }

  unfavorite(post: any) {
    this.favoritesService.removePost(post);
  }
}
