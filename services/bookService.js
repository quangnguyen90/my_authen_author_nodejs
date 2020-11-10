let BookModel = require("../models/bookModel");

function createBook(name) {
    return BookModel.create({
        name
    });
}

function getBookById(id) {
    return BookModel.findOne({
        _id: id
    });
}

module.exports = {
    createBook,
    getBookById
}
