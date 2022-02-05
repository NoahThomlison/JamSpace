import http from '../http-common';

class ListingsDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`/id/${id}`);
  }

  find(query, by = 'description', page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }

  createListing(data) {
    return http.post('/ad', data);
  }

  updateListing(data) {
    return http.put('/ad', data);
  }

  deleteListing(id) {
    return http.delete(`/ad?id=${id}`);
  }
}

export default new ListingsDataService();
