import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { find as rFind, pathEq as rPathEq, propEq as rPropEq, remove as rRemove, findIndex as rFindIndex} from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  API_KEY = 'AIzaSyCo7y31Dku_6jmvsbsKZwe2jjvdOodUC1E'
  favoritesList:any = new Array()


  constructor(private http:HttpClient) { }


  getList (number_page) {
    return this.http.get('/api/volumes',{params: { key: this.API_KEY, q:null, startIndex:number_page.toString() , maxResults:'10'}});
  }

  getFavoritesList ():any {
      return this.favoritesList = JSON.parse(this.getLocalStorage ('card')) ?? []
  }

  addFavoritesList (card) {
     if(!rFind(rPropEq('title', card.title))(this.favoritesList)) {
       this.favoritesList.push(card);
       this.addLocalStorage('card', this.favoritesList)
     }
  }


  deleteFavoritesList (card) {
    let index = rFindIndex(rPropEq('title', card.title))(this.favoritesList)
    this.favoritesList = rRemove(index, 1, this.favoritesList);
    console.log(this.favoritesList);
    this.addLocalStorage('card', this.favoritesList)
  }

  private addLocalStorage (key:string,obj) {
    return localStorage.setItem(key, JSON.stringify(obj));
  }

  private getLocalStorage (key:string) {
    return localStorage.getItem(key);
  }

  private clearLocalStorage (key:string) {
    localStorage.removeItem(key)
  }

}

