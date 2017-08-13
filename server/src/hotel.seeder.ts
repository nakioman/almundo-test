import * as seeder from 'mongoose-seeder';

const data = require('./hotels.json');
const hotels = {
  hotels: {
    '_model': 'Hotel',
  }
};

data.hotels.forEach(item => {
  hotels.hotels[item.slug] = {
    name: item.name,
    stars: item.stars,
    price: item.price.amount,
    image: item.image,
    nameFilter: item.name.toLowerCase(),
  };
});

const seed = () => {
  seeder.seed(hotels)
    .catch(err => console.error(err));
};

export default seed;
