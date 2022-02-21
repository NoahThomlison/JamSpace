import http from '../http-users';

class UsersDataService {
  getAll() {
    return http.get();
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  // find User by Email
  find(email, password) {
    return http.get(`?email=${email}&password=${password}`);
  }

  createUser(data) {
    return http.post('/user', data);
  }

  updateUser(user, newListings, type) {
    const data = {
      userId: user._id,
      host: user.host,
      listings: newListings,
      type: type,
    };
    return http.put('/user', data);
  }

  updateUserBookings(user, newBooking) {
    const data = {
      userId: user._id,
      bookings: user.booking_ids,
      newBooking: newBooking,
    };
    return http.put('/bookings', data);
  }

  removeUserBooking(user, newBookings) {
    const data = {
      userId: user._id,
      newBookings: newBookings,
    };
    return http.put('/deletebooking', data);
  }

  deleteUser(id) {
    return http.delete(`/user?id=${id}`);
  }
}

export default new UsersDataService();
