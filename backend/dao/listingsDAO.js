let listings;

export default class ListingsDAO {
  static async injectDB(conn) {
    if (listings) {
      return;
    }
    try {
      listings = await conn
        .db(process.env.INSTRUMENTLISTINGS_NS)
        .collection('listings');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in listingsDAO: ${e}`
      );
    }
  }

  static async getListings({
    filters = null,
    page = 0,
    listingsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ('description' in filters) {
        query = { $text: { $search: filters['description'] } };
      } else if ('instrument_type' in filters) {
        query = { instrument_type: { $eq: filters['instrument_type'] } };
      } else if ('brand' in filters) {
        query = { brand: { $eq: filters['brand'] } };
      } else if ('city' in filters) {
        query = { 'address.city': { $eq: filters['city'] } };
      }
    }

    let cursor;

    try {
      cursor = await listings.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { listingsList: [], totalNumListings: 0 };
    }

    const displayCursor = cursor
      .limit(listingsPerPage)
      .skip(listingsPerPage * page);

    try {
      const listingsList = await displayCursor.toArray();
      const totalNumListings =
        page === 0 ? await listings.countDocuments(query) : 0;
      return { listingsList, totalNumListings };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { listingsList: [], totalNumListings: 0 };
    }
  }
}
