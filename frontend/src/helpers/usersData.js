// Import the db query calls
import UsersDataService from '../services/users';

// the user search needs to look for users email, not id
// not working properly
const userData = setUser => {
  UsersDataService.getAll()
    .then(response => {
      setUser(response.data.users);
    })
    .catch(e => {
      console.log(e);
    });
};

const findAndSet = (setUser, query) => {
  console.log(query);
  UsersDataService.find(query)
    .then(response => {
      setUser(response.data.users[0]);
    })
    .catch(e => {
      console.error(e);
    });
};

export { userData, findAndSet };
