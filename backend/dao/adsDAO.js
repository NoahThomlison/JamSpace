import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

let ads;

export default class AdsDAO {
  static async injectDB(conn) {
    if (ads) {
      return;
    }
    try {
      ads = await conn
        .db(process.env.INSTRUMENTLISTINGS_NS)
        .collection('listings');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in listingsDAO: ${e}`
      );
    }
  }

  static async addAd(
    title,
    description,
    instrument_type,
    brand,
    condition,
    price,
    deposit,
    images,
    userId,
    user,
    address,
    date
  ) {
    try {
      const adDoc = {
        title: title,
        description: description,
        instrument_type: instrument_type,
        brand: brand,
        condition: condition,
        price: price,
        security_deposit: deposit,
        images: [images],
        host_id: new ObjectId(userId),
        host: user,
        address: address,
        created_on: date,
        updated_on: date,
      };
      console.log(adDoc);
      return await ads.insertOne(adDoc);
    } catch (e) {
      console.error(`Unable to post ad: ${e}`);
      return { error: e };
    }
  }

  static async updateAd(adId, title, description, userId, date) {
    try {
      const updateResponse = await ads.updateOne(
        {
          _id: ObjectId(adId),
          host_id: userId,
        },
        { $set: { title: title, description: description, updated_on: date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update ad: ${e}`);
      return { error: e };
    }
  }

  static async deleteAd(adId) {
    try {
      const deleteResponse = await ads.deleteOne({
        _id: ObjectId(adId),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete ad: ${e}`);
      return { error: e };
    }
  }
}
