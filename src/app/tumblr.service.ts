import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {
  }

  searchByNameAndTag(name: string, tag: string[]): Promise<any> {
    // let url = `https://api.tumblr.com/v2/blog/${name}.tumblr.com/posts?api_key=${this.TUMBLR_KEY}&tag=${tag}`;
    // console.log(url);
    // return this.http.get(url);

    return this.client.blogPosts(name, {tag: tag});

  }

  searchByName(name: string): Promise<Object> {
    // return this.http.get(`https://api.tumblr.com/v2/blog/${name}.tumblr.com/posts?api_key=${this.TUMBLR_KEY}`);
    return this.client.blogPosts(name);
  }

  searchByTag(tag: string[]): Promise<Object> {
    // return this.http.get(`https://api.tumblr.com/v2/tagged?tag=${tag}?api_key=${this.TUMBLR_KEY}`);
    return this.client.taggedPosts(tag);
  }
}



// Request-token URL:
// POST https://www.tumblr.com/oauth/request_token
// Authorize URL:
// https://www.tumblr.com/oauth/authorize
// Access-token URL:
// POST https://www.tumblr.com/oauth/access_token

// api.tumblr.com/v2/blog/
// {blog-identifier}/posts
// [/type]?
// api_key={key}
// &[optional-params=]

// ex :
// https://api.tumblr.com/v2/blog/pitchersandpoets.tumblr.com/posts/photo?api_key=tRmOOI2uOID8xY6i0UDvxgH3Fa9884Ts0S0y5ALlZSGacb608X&tag=new+york+yankees
// https://api.tumblr.com/v2/blog/
// pitchersandpoets.tumblr.com/posts/
// photo?
// api_key=tRmOOI2uOID8xY6i0UDvxgH3Fa9884Ts0S0y5ALlZSGacb608X
// &tag=new+york+yankees
