const express = require("express");
const bookController = require("../controllers/bookControllers");
const router = express.Router();

router.param("id", bookController.checkID);

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.checkBody, bookController.createBook);

router
  .route("/:id")
  .get(bookController.getBook)
  .patch(bookController.checkBody, bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
