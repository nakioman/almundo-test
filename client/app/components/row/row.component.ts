import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).foundation();
  }
}
