import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import ListingsDAO from './dao/listingsDAO.js';
import AdsDAO from './dao/adsDAO.js';

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.INSTRUMENTLISTINGS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 250,
  useNewUrlParser: true,
})
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await ListingsDAO.injectDB(client);
    await AdsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server up and running on port ${port}`);
    });
  });