import * as Resource from 'odata-resource';

import hotelModel from './hotel.model';

export default new Resource({
  rel: '/api/hotels',
  model: hotelModel,
  count: true,
});
