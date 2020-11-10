let bookService = require ("../services/bookService.js");

let createBookController = async (req, res) => {
    try {
        await bookService.createBook(req.name);
        return res.status(200).json({
            error: false,
            status: 200,
            message: "Create book OK",
        });
    } catch (error) {
        if (error) {
            return res.status(500).json({
                error: true,
                status: 500,
                message: "Create book fail",
            });
        }
    }
}

module.exports = {
    createBookController,
};