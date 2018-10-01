import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post: any;

  @Input() buttonText: string;

  @Output() favorite: EventEmitter<any> = new EventEmitter();

  favoriteBtnClicked() {
    this.favorite.emit(null);
  }

}
