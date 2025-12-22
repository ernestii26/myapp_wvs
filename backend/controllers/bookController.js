// 書籍控制器
const getBooks = (req, res) => {
  res.json({ message: 'Get all books' });
};

const getBook = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get book ${id}` });
};

const createBook = (req, res) => {
  const { title, author, isbn } = req.body;
  res.json({ message: 'Book created', data: { title, author, isbn } });
};

const updateBook = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Book ${id} updated` });
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Book ${id} deleted` });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};
