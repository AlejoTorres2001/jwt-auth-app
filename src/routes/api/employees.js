const express = require("express");
const router = express.Router();
const path = require("path");
const {
  getEmployee,
  deleteEmployee,
  updateEmployee,
  createNewEmployee,
  getAllEmployees,
} = require("../../controllers/employeesController");

router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);
router.route("/:id").get(getEmployee);

module.exports = router;
