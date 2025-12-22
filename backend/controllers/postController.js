const prisma = require('../utils/prisma');

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    const formattedPosts = posts.map(post => ({
      ...post,
      images: post.images.map(img => `${req.protocol}://${req.get('host')}/uploads/${img}`),
      time: new Date(post.createdAt).toLocaleString()
    }));

    res.json(formattedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { category, content } = req.body;
    const imageFiles = req.files || [];
    const imageNames = imageFiles.map(file => file.filename);

    const newPost = await prisma.post.create({
      data: {
        name: '我', 
        handle: '@me',
        content: category ? `[${category}] ${content}` : content,
        images: imageNames,
        commentsCount: 0,
        avatar: 'https://i.pravatar.cc/150?img=10' // Default avatar
      }
    });
    
    const responsePost = {
        ...newPost,
        images: newPost.images.map(img => `${req.protocol}://${req.get('host')}/uploads/${img}`),
        time: '剛剛'
    };

    res.json({ message: 'Post created', data: responsePost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Post ${id} updated` });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
      await prisma.post.delete({ where: { id } });
      res.json({ message: `Post ${id} deleted` });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};
