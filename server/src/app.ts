import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

import hotelResource from './hotel.resource';
import hotelSeeder from './hotel.seeder';

dotenv.config();
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create link to Angular build directory
const distDir = __dirname + '/../client/';
app.use(express.static(distDir));

hotelResource.initRouter(app);

// connect to mongo db
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, { useMongoClient: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
mongoose.connection.once('open', () => {
  console.log('Connection to mongodb is now open');
  hotelSeeder();
});
(<any>mongoose).Promise = global.Promise;

// Initialize the app.
const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log('App now running on port', port);
});
