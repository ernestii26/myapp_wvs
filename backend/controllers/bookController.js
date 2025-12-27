// 書籍控制器
export const getBooks = (req, res) => {
  res.json({ message: 'Get all books' });
};

export const getBook = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get book ${id}` });
};

export const createBook = (req, res) => {
  const { title, author, isbn } = req.body;
  res.json({ message: 'Book created', data: { title, author, isbn } });
};

export const updateBook = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Book ${id} updated` });
};

export const deleteBook = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Book ${id} deleted` });
};
