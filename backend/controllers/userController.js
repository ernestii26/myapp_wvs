// 用戶控制器
const getUsers = (req, res) => {
  res.json({ message: 'Get all users' });
};

const getUser = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get user ${id}` });
};

const createUser = (req, res) => {
  const { name, email } = req.body;
  res.json({ message: 'User created', data: { name, email } });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} updated` });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted` });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
