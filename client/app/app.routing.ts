import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './components/search/search.component';

const hotelRoutes: Routes = [
  { path: '', component: SearchComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(hotelRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HotelRoutingModule { }
