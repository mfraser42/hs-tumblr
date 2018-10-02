import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

  @Input() posts: any[];

  // Use to trust html before it's injected, optional
  @Input() sanitizer?: DomSanitizer;

  @Input() buttonText: string;

  @Output() postFavorited: EventEmitter<any> = new EventEmitter();

  trustHtml(html: string): SafeHtml | string {
    if (this.sanitizer) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } else {
      return html;
    }
  }

  favorited(post: any) {
    this.postFavorited.emit(post);
  }

}
