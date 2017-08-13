export interface IHotel {
  name: string;
  stars: number;
  price: number;
  image: string;
}

export interface IHotelResults {
  count: number;
  results: Array<IHotel>;
}

export interface IHotelFilters {
  name?: string;
  stars?: Array<number>;
  priceFrom?: number;
  priceTo?: number;
  skip: number;
  top: number;
}
