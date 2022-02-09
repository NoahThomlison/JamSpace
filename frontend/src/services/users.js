import http from '../http-users';

class UsersDataService {
  getAll() {
    return http.get();
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  // find User by Email
  find(query) {
    console.log(`?email=${query}`);
    return http.get(`?email=${query}`);
  }

  createUser(data) {
    return http.post('/user', data);
  }

  updateUser(data) {
    return http.put('/user', data);
  }

  deleteUser(id) {
    return http.delete(`/user?id=${id}`);
  }
}

export default new UsersDataService();
