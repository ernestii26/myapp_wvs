import prisma from '../utils/prisma.js';

// 用戶控制器
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { id, username, avatar, email } = req.body;
  try {
    const user = await prisma.user.upsert({
        where: { id },
        update: { username, avatar, email },
        create: { id, username, avatar, email }
    });
    res.json({ message: 'User synced', data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  // Implement update logic
  res.json({ message: `User ${id} updated` });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
      await prisma.user.delete({ where: { id } });
      res.json({ message: `User ${id} deleted` });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
