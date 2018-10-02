import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  public posts: any[] = [];
  public postInfo: {[id: number]: number} = {};

  constructor() { }

  getPosts(): any[] {
    return this.posts;
  }

  addPost(post:any) {
    //console.log(post.id);
    if (!this.hasPost(post.id)) {
      const newLength = this.posts.push(post);
      this.postInfo[post.id] = newLength - 1;
    }
  }

  removePost(post:any) {
    if (this.hasPost(post.id)) {
      const index = this.postInfo[post.id];
      this.posts.splice(index, 1);
      delete this.postInfo[post.id];
    }
  }

  // checks if post already exists in the favorites
  hasPost(postID: number): boolean {
    //console.log(postID);
    if (this.postInfo[postID] || this.postInfo[postID] === 0) {
      return true;
    } else {
      return false;
    }
  }
}
