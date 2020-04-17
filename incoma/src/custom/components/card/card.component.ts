import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {APIService} from '@services/API/api.service.ts'


export interface Card {
  title:string,
  authors:[]
  imageLinks:string,
  description:string,
  language:string,
  pageCount:number,
  favorites:boolean | false
}


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card:Card
  @Output() editFavorites = new EventEmitter ()

  constructor(private APIService:APIService) { }

  ngOnInit(): void {
  }

  changeFavorites() {
    this.card.favorites = !this.card.favorites;
      if(this.card.favorites){
        this.addCardFavorites(this.card);
      }else {
        this.deleteCardFavorites(this.card);
      }

  }

  addCardFavorites(card) {
    this.APIService.addFavoritesList(this.card);
    this.editFavorites.emit(this.card);
  }

  deleteCardFavorites(card) {
    this.APIService.deleteFavoritesList(this.card);
    this.editFavorites.emit(this.card);
  }

}
