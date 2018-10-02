import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import * as tumblr from 'tumblr.js';


@Injectable({
  providedIn: 'root'
})
export class TumblrService {

  private TUMBLR_KEY: string = environment.tumblrKey;

  private client: any = tumblr.createClient({
    credentials: {
      consumer_key: this.TUMBLR_KEY
    },
    returnPromises: true
  });

  constructor() {
  }

  searchByNameAndTag(name: string, tag: string[]): Promise<any> {
    // let url = `https://api.tumblr.com/v2/blog/${name}.tumblr.com/posts?api_key=${this.TUMBLR_KEY}&tag=${tag}`;
    // return this.http.get(url);

    return this.client.blogPosts(name, {tag: tag});
  }

  searchByName(name: string): Promise<Object> {
    // return this.http.get(`https://api.tumblr.com/v2/blog/${name}.tumblr.com/posts?api_key=${this.TUMBLR_KEY}`);
    return this.client.blogPosts(name);
  }

  searchByTag(tag: string[]): Promise<Object> {
    return this.client.taggedPosts(tag);
  }
}
