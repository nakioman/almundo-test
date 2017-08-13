import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RootComponent } from './root.component';
import { SearchComponent } from './components/search/search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { RowComponent } from './components/row/row.component';
import { ListComponent } from './components/list/list.component';

import { HotelRoutingModule } from './app.routing';
import { HotelService } from './services/hotel.service';

@NgModule({
  declarations: [
    RootComponent,
    SearchComponent,
    FiltersComponent,
    RowComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    HotelRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HotelService,
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
