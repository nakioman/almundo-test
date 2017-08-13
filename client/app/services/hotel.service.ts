import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

import { IHotel, IHotelResults, IHotelFilters } from '../models/hotel.model';

const BASE_URL = 'api/hotels';
const COUNT_URL = `${BASE_URL}/count`;

@Injectable()
export class HotelService {

  constructor(private http: HttpClient) {
  }

  private query(): QueryData {
    return new QueryData(this.http);
  }

  public getHotels(filters: IHotelFilters): Promise<IHotelResults> {
    return new Promise<IHotelResults>((resolve, reject) => {
      const hotels = this.query().skipRows(filters.skip).takeRows(filters.top);
      if (filters.name) {
        hotels.containsName(filters.name);
      }
      if (filters.priceFrom && filters.priceTo) {
        hotels.priceRange(filters.priceFrom, filters.priceTo);
      }
      if (filters.stars) {
        hotels.hasStars(filters.stars);
      }
      Promise.all([hotels.exec(), hotels.execCount()]).then(values => {
        const results: IHotelResults = {
          count: values[1],
          results: values[0]
        };
        resolve(results);
      }).catch(err => reject(err));
    });
  }
}

class QueryData {
  private filter: string;
  private top: number;
  private skip: number;

  constructor(private http: HttpClient) {
    this.top = 10;
    this.skip = 0;
    this.filter = '$filter=';
  }

  private hasFilters() {
    return this.filter.lastIndexOf('=') !== (this.filter.length - 1);
  }

  public hasStars(stars: Array<number>) {
    this.filter = `${this.filter}${this.hasFilters() ? ' and ' : ''}in(stars, ${stars.join()})`;
    return this;
  }

  public containsName(name: string) {
    this.filter = `${this.filter}${this.hasFilters() ? ' and ' : ''}contains(name, '${name}')`;
    return this;
  }

  public priceRange(from: number, to: number) {
    this.filter = `${this.filter}${this.hasFilters() ? ' and ' : ''}price gt ${from} and price lt ${to}`;
    return this;
  }

  public skipRows(skip: number) {
    this.skip = skip;
    return this;
  }

  public takeRows(take: number) {
    this.top = take;
    return this;
  }

  public exec(): Promise<Array<IHotel>> {
    return new Promise<Array<IHotel>>((resolve, reject) => {
      this.http.get<any>(`${BASE_URL}?${this.filter}&$skip=${this.skip}&$top=${this.top}`)
        .subscribe(data => resolve(data.list), err => reject(err));
    });
  }

  public execCount(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.http.get<number>(`${COUNT_URL}?${this.filter}&$skip=${this.skip}&$top=${this.top}`)
        .subscribe(data => resolve(data), err => reject(err));
    });
  }
}
