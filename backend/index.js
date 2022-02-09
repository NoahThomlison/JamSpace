import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import AdsDAO from './dao/adsDAO.js';
import ListingsDAO from './dao/listingsDAO.js';
import UsersDAO from './dao/usersDAO.js';

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
    await AdsDAO.injectDB(client);
    await ListingsDAO.injectDB(client);
    await UsersDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Server up and running on port ${port}`);
    });
  });
