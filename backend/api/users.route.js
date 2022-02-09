import express from 'express';
import UsersCtrl from './users.controller.js';

const router = express.Router();

router.route('/').get(UsersCtrl.apiGetUsers);
router.route('/id/:id').get(UsersCtrl.apiGetUserById);

router
  .route('/user')
  .post(UsersCtrl.apiCreateUser)
  .put(UsersCtrl.apiUpdateUser)
  .delete(UsersCtrl.apiDeleteUser);

export default router;
