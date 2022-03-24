import { parse } from 'dotenv';
import ListingsDAO from '../dao/listingsDAO.js';

export default class ListingsController {
  // Gets all the listings stored in the database.
  static async apiGetListings(req, res, next) {
    const listingsPerPage = req.query.listingsPerPage
      ? parseInt(req.query.listingsPerPage, 10)
      : 100;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.instrument_type) {
      filters.instrument_type = req.query.instrument_type;
    } else if (req.query.brand) {
      filters.brand = req.query.brand;
    } else if (req.query.city) {
      filters.city = req.query.city;
    } else if (req.query.description) {
      filters.description = req.query.description;
    }

    const { listingsList, totalNumListings } = await ListingsDAO.getListings({
      filters,
      page,
      listingsPerPage,
    });

    let response = {
      listings: listingsList,
      page: page,
      filters: filters,
      entries_per_page: listingsPerPage,
      total_results: totalNumListings,
    };
    res.json(response);
  }

  // Gets a single listing from the database by looking for the passed in id.
  static async apiGetListingById(req, res, next) {
    try {
      let id = req.params.id || {};
      let listing = await ListingsDAO.getListingById(id);
      if (!listing) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(listing);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
