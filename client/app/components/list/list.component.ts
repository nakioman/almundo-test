import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HotelService } from '../../services/hotel.service';
import { IHotelResults, IHotelFilters } from '../../models/hotel.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public hotels: IHotelResults;
  public filters: IHotelFilters;

  constructor(private hotelService: HotelService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((value: IHotelFilters) => this.search(value));
  }

  private search(filters: IHotelFilters) {
    this.filters = filters;
    this.hotels = null;
    this.hotelService.getHotels(filters).then(hotels => this.hotels = hotels);
  }

  public goToPreviousPage() {
    const skip: number = Number(this.filters.skip) - 10;
    this.router.navigate([''], {
      queryParams: {
        name: this.filters.name,
        priceFrom: this.filters.priceFrom,
        priceTo: this.filters.priceTo,
        stars: this.filters.stars,
        skip: skip,
        top: this.filters.top
      }
    });
  }

  public goToNextPage() {
    const skip: number = Number(this.filters.skip) + 10;
    this.router.navigate([''], {
      queryParams: {
        name: this.filters.name,
        priceFrom: this.filters.priceFrom,
        priceTo: this.filters.priceTo,
        stars: this.filters.stars,
        skip: skip,
        top: this.filters.top
      }
    });
  }
}
