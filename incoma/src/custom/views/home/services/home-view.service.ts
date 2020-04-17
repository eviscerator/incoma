import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { flatMap, map, pluck, share, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeViewService {

  constructor() {
  }
  
}
