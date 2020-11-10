let BorrowBookModel = require("../models/borrowBookModel");

function createBorrowBook(infoBorrowBook) {
    return BorrowBookModel.create({
        infoBorrowBook
    });
}

function getBorrowBookById(id) {
    return BorrowBookModel.findOne({
        _id: id
    });
}

module.exports = {
    createBorrowBook,
    getBorrowBookById
}
