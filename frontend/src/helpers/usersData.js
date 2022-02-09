// Import the db query calls
import UsersDataService from '../services/users';

// the user search needs to look for users email, not id
const userData = setUser => {
  UsersDataService.getAll()
    .then(response => {
      //just set as first user right now
      setUser(response.data.users[0]);
    })
    .catch(e => {
      console.log(e);
    });
};

export default userData;
