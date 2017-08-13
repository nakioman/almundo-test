import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  ngAfterViewInit() {
    $(document).foundation();
  }
}
