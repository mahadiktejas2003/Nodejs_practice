const express = require("express");
const router = express.Router();
const {handleGetAllUsers,handleGetUserById, handleUpdateUserById, handleDeleteUserById,handleCreateNewUser}= require('../controller/user')

// REST API
router.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUser)

 router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

// If you're using the router:
module.exports = router;
