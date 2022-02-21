import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn
        .db(process.env.INSTRUMENTLISTINGS_NS)
        .collection('users');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`
      );
    }
  }

  // Get all Users
  static async getUsers({ filters = null }) {
    let query;
    if (filters) {
      if ('email' in filters) {
        query = { email: { $eq: filters['email'] } };
      }
    }

    let cursor;

    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { usersList: [], totalNumUsers: 0 };
    }

    const displayCursor = cursor;
    try {
      const userPassword = filters.password;
      let successfulMatch = false;
      const usersList = await displayCursor.toArray();
      const dbPassword = usersList[0].password;
      const totalNumUsers = await users.countDocuments(query);
      successfulMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(userPassword, dbPassword, function (err, result) {
          if (result) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      });

      console.log(successfulMatch);
      if (successfulMatch) {
        return { usersList, totalNumUsers };
      } else {
        return { usersList: [], totalNumUsers: 0 };
      }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { usersList: [], totalNumUsers: 0 };
    }
  }

  // Get specific user by id
  static async getUserById(id) {
    let cursor;
    let query = { _id: new ObjectId(id) };
    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { user: {} };
    }

    const displayCursor = cursor;

    try {
      const user = await displayCursor.toArray();
      return { user };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { user: {} };
    }
  }

  // Create a new User
  static async addUser(
    first_name,
    last_name,
    email,
    password,
    image,
    about,
    address,
    host,
    listing_ids,
    booking_ids,
    date
  ) {
    try {
      const userDoc = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        image: image,
        about: about,
        address: address,
        host: host,
        listing_ids: listing_ids,
        booking_ids: booking_ids,
        created_on: date,
        updated_on: date,
      };
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to post ad: ${e}`);
      return { error: e };
    }
  }

  // Update a users information
  static async updateUser(user_id, host, listing_ids, type, date) {
    const listingIds = listing_ids.map(id => new ObjectId(id));
    try {
      const updateResponse = await users.updateOne(
        {
          _id: new ObjectId(user_id),
        },
        {
          $set: {
            host: host,
            listing_ids: listingIds,
            updated_on: date,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update ad: ${e}`);
      return { error: e };
    }
  }

  // Update a users information
  static async updateUserBookings(user_id, bookings, newBooking, date) {
    const updatedBookings = bookings.map(element => ({
      ...element,
      booking: new ObjectId(element.booking),
    }));
    const newBookingId = new ObjectId();
    const updatedNewBooking = { booking: newBookingId, ...newBooking };
    updatedBookings.push(updatedNewBooking);
    try {
      const updateResponse = await users.updateOne(
        {
          _id: new ObjectId(user_id),
        },
        {
          $set: {
            booking_ids: updatedBookings,
            updated_on: date,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update ad: ${e}`);
      return { error: e };
    }
  }

  // Delete a users booking
  static async deleteUserBooking(user_id, newBookings, date) {
    const updatedBookings = newBookings.map(element => ({
      ...element,
      booking: new ObjectId(element.booking),
    }));
    try {
      const updateResponse = await users.updateOne(
        {
          _id: new ObjectId(user_id),
        },
        {
          $set: {
            booking_ids: updatedBookings,
            updated_on: date,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update ad: ${e}`);
      return { error: e };
    }
  }

  // Delete a user
  static async deleteUser(user_id) {
    try {
      const deleteResponse = await users.deleteOne({
        _id: ObjectId(user_id),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete ad: ${e}`);
      return { error: e };
    }
  }
}
