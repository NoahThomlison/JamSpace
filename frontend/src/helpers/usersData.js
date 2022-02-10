// Import the db query calls
import UsersDataService from '../services/users';

// the user search needs to look for users email, not id
// not working properly
const userData = (setUser, id) => {
  UsersDataService.get(id)
    .then(response => {
      setUser(response.data.user[0]);
    })
    .catch(e => {
      console.log(e);
    });
};

const findAndSet = (setUser, email, password, handleCookie) => {
  UsersDataService.find(email, password)
    .then(response => {
      setUser(response.data.users[0]);
      handleCookie(response.data.users[0]._id);
    })
    .catch(e => {
      console.error(e);
    });
};

export { userData, findAndSet };
