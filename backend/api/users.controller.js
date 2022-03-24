import { parse } from 'dotenv';
import UsersDAO from '../dao/usersDAO.js';
import bcrypt from 'bcrypt';

export default class UsersController {
  // Get all users from the users collection in the database
  static async apiGetUsers(req, res, next) {
    let filters = {};
    const { email, password } = req.query;
    if (email && password) {
      filters.email = email;
      filters.password = password;
    }

    const { usersList, totalNumUsers } = await UsersDAO.getUsers({ filters });

    let response = {
      users: usersList,
      filters: filters,
      total_results: totalNumUsers,
    };
    res.json(response);
  }

  // Get the specific user with the id that is passed through from the users collection in the database
  static async apiGetUserById(req, res, next) {
    try {
      let id = req.params.id || {};
      let user = await UsersDAO.getUserById(id);
      if (!user) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(user);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // Create a new user in the users collection
  static async apiCreateUser(req, res, next) {
    try {
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const email = req.body.email;
      const password = req.body.password;
      const image = req.body.image;
      const about = req.body.about;
      const address = {
        street: req.body.street,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        postal_code: req.body.postal_code,
      };
      const host = false;
      const listing_ids = [];
      const booking_ids = [];
      const date = new Date();
      const adResponse = bcrypt.hash(password, 10, function (err, hash) {
        UsersDAO.addUser(
          first_name,
          last_name,
          email,
          hash,
          image,
          about,
          address,
          host,
          listing_ids,
          booking_ids,
          date
        );
      });
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateUser(req, res, next) {
    try {
      const user_id = req.body.userId;
      // const host = req.body.listings.length > 0 ? true : false;
      const host = req.body.host;
      const listings = req.body.listings;
      const type = req.body.type;
      const date = new Date();

      const adResponse = await UsersDAO.updateUser(
        user_id,
        host,
        listings,
        type,
        date
      );

      var { error } = adResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (adResponse.modifiedCount === 0) {
        throw new Error(
          'unable to update user - current user may not be original user'
        );
      }

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateBookings(req, res, next) {
    try {
      const user_id = req.body.userId;
      const bookings = req.body.bookings;
      const newBooking = req.body.newBooking;
      const date = new Date();

      const adResponse = await UsersDAO.updateUserBookings(
        user_id,
        bookings,
        newBooking,
        date
      );

      var { error } = adResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (adResponse.modifiedCount === 0) {
        throw new Error(
          'unable to update user - current user may not be original user'
        );
      }

      res.json({ adResponse, status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Delete a specific booking
  static async apiDeleteBooking(req, res, next) {
    try {
      const user_id = req.body.userId;
      const newBookings = req.body.newBookings;
      const date = new Date();

      const adResponse = await UsersDAO.deleteUserBooking(
        user_id,
        newBookings,
        date
      );

      var { error } = adResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (adResponse.modifiedCount === 0) {
        throw new Error(
          'unable to update user - current user may not be original user'
        );
      }

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteUser(req, res, next) {
    try {
      const userId = req.query.id;
      const adResponse = await UsersDAO.deleteUser(userId);

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
