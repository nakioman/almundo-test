import { Component, AfterViewInit, Input } from '@angular/core';

import { IHotel } from '../../models/hotel.model';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements AfterViewInit {
  @Input() public hotel: IHotel;

  ngAfterViewInit() {
    $(document).foundation();
  }

  public createRange() {
    const items: number[] = [];
    for (let i = 1; i <= this.hotel.stars; i++) {
       items.push(i);
    }
    return items;
  }
}
