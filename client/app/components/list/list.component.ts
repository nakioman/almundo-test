import { Component, AfterViewInit } from '@angular/core';
import $ from 'jquery';
import 'foundation-sites';

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
