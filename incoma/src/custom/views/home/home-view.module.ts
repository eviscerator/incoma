import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeViewService } from '@views/home/services/home-view.service';
import { HomeRoutingModule } from './home-view.routing.module';
import { HomeViewComponent } from './home-view/home-view.component';
import { CardListComponent } from '@components/card-list/card-list.component';
import { CardComponent } from '@components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [HomeViewService],
  declarations: [
    HomeViewComponent,
    CardListComponent,
    CardComponent
  ],
  exports:[
    CardListComponent,
    CardComponent
  ]
})
export class HomeViewModule {}
