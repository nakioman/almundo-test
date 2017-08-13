import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).foundation();
  }
}
