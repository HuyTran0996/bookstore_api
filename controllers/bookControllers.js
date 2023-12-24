const fs = require("fs");

const data = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/db.json`));

const checkID = (req, res, next, val) => {
  console.log(`book id is ${val}`);
  // const book = data.books.find((e) => e.id === req.params.id);
  //note: req.params.id và val cho giá trị như nhau
  const book = data.books.find((e) => e.id === val);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  next();
};
const checkBody = (req, res, next) => {
  if (
    !req.body.author ||
    !req.body.country ||
    !req.body.imageLink ||
    !req.body.language ||
    !req.body.link ||
    !req.body.pages ||
    !req.body.title ||
    !req.body.year
  ) {
    return res.status(400).json({
      status: "fail",
      message:
        "missing information, please give info of author, country, imageLink, language, link, pages, title, year ",
    });
  }
  next();
};

const getAllBooks = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      result: data.books.length,
      data: {
        books: data.books,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id in getAllBooks",
    });
  }
};

const getBook = async (req, res) => {
  try {
    const book = data.books.find((e) => e.id === req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        book: book,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id in getBook",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookIndex = await data.books.findIndex((e) => e.id === req.params.id);

    const book = await data.books.find((e) => e.id === req.params.id);
    const updatedBook = Object.assign({ id: book.id }, req.body);

    data.books[bookIndex] = updatedBook;

    fs.writeFile(
      `${__dirname}/../dev-data/db.json`,
      JSON.stringify(data),
      (err) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Could not write to file",
          });
        }

        res.status(200).json({
          status: "success",
          data: {
            book: req.body,
          },
        });
      }
    );
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id in updateBook",
    });
  }
};

const createBook = async (req, res) => {
  try {
    const newId = (await data.books[data.books.length - 1].id) + 1;
    const newBook = Object.assign({ id: newId }, req.body);

    data.books.push(newBook);
    fs.writeFile(
      `${__dirname}/../dev-data/db.json`,
      JSON.stringify(data),
      (err) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Could not write to file",
          });
        }
        res.status(201).json({
          status: "success",
          data: {
            book: newBook,
          },
        });
      }
    );
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id in createBook",
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookIndex = data.books.findIndex((e) => e.id === req.params.id);

    data.books.splice(bookIndex, 1);

    fs.writeFile(
      `${__dirname}/../dev-data/db.json`,
      JSON.stringify(data),
      (err) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Could not write to file",
          });
        }

        res.status(200).json({
          status: "success",
          data: null,
        });
      }
    );
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id in deleteBook",
    });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
  createBook,
  checkID,
  checkBody,
};
