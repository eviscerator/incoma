import { Component, OnInit } from '@angular/core';
import {APIService} from '@services/API/api.service.ts'
import { map, tap } from 'rxjs/operators';

export interface Card {
  title:string,
  authors:[]
  imageLinks:string,
  language:string,
  pageCount:number,
  favorites:boolean | false
}

export interface Res {
  kind:string,
  totalItems:number,
  items:[]
}


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cardsList:Card[]=[]
  baseCardsList:Card[]=[]
  favoritesCardsList:Card[]=[]
  showCards = false
  number_pages = 0

  constructor(private APIService:APIService) { }

  ngOnInit(): void {
    this.getCardsList(this.number_pages);
    this.getFavoritesList();
  }

  showFavoritesCards () {
    this.showCards = !this.showCards
  }

  moreUploadCards () {
    ++this.number_pages
    this.getCardsList(this.number_pages*10);
  }

  getCardsList (number_pages) {
    this.APIService.getList(number_pages).pipe(
      map((res:Res)=>{
        res.items.map((item:any)=>{
          this.baseCardsList.push({
            title: item.volumeInfo.title,
            authors:item.volumeInfo.authors,
            imageLinks:item.volumeInfo.imageLinks.thumbnail,
            language:item.volumeInfo.language,
            pageCount: item.volumeInfo.pageCount,
            favorites:false
          })
        })
      }),
      tap(()=>this.cardsList = this.baseCardsList)
    ).subscribe()
  }

  getFavoritesList() {
    this.favoritesCardsList = this.APIService.getFavoritesList()
  }

  filter (e:KeyboardEvent) {
    const value = (e.target as HTMLInputElement).value.toLowerCase();
    if(value){
        this.cardsList = this.cardsList.filter(card=>card.title.toLowerCase().includes(value));
      } else {
        this.cardsList = this.baseCardsList;
      }
  }


}
