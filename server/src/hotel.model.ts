import { Schema, model } from 'mongoose';

const hotelSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  nameFilter: {
    type: String,
    required: true,
  }
});

export default model('Hotel', hotelSchema);
