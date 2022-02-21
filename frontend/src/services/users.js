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

  deleteUser(id) {
    return http.delete(`/user?id=${id}`);
  }
}

export default new UsersDataService();
