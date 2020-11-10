let borrowBookService = require ("../services/borrowBookService");

let createBorrowBookController = async (req, res) => {
    try {
        await borrowBookService.createBorrowBook(req.body);
        return res.status(200).json({
            error: false,
            status: 200,
            message: "Borrow book OK",
        });
    } catch (error) {
        if (error) {
            return res.status(500).json({
                error: true,
                status: 500,
                message: "Borrow book fail",
            });
        }
    }
}

module.exports = {
    createBorrowBookController,
};