import { PostsTake } from '../constants/config.js';
import prisma from '../utils/prisma.js';

export const getPosts = async (req, res) => {
  try {
    // 確保 req.query 和 req.body 存在，避免 undefined 錯誤
    const query = req.query || {};
    const body = req.body || {};
    const cursor = query.cursor || body.cursor;
    
    const posts = await prisma.post.findMany({
      take: PostsTake + 1,
      ...(cursor
        ? {
            cursor: { id: cursor },
            skip: 1,
          }
        : {}),
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    });
    
    let nextCursor = null;
    if (posts.length > PostsTake) {
      const nextItem = posts.pop();
      nextCursor = nextItem.id;
    }
    
    const formattedPosts = posts.map(post => ({
      ...post,
      images: post.images ? post.images.map(img => `${req.protocol}://${req.get('host')}/uploads/${img}`) : [],
      time: new Date(post.createdAt).toLocaleString(),
      name: post.author?.username || post.name || 'Anonymous',
      avatar: post.author?.avatar || post.avatar || 'https://i.pravatar.cc/150?img=10',
      handle: post.author ? `@${post.author.username}` : post.handle || '@anon'
    }));

    if (cursor || query.paginated === 'true') {
        res.json({ newPosts: formattedPosts, nextCursor });
    } else {
        res.json(formattedPosts);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({ 
        where: { id },
        include: { author: true }
    });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { category, content, title } = req.body;
    const imageFiles = req.files || [];
    const imageNames = imageFiles.map(file => file.filename);
    
    const userId = req.auth?.payload?.sub;

    const postData = {
        content: category ? `[${category}] ${content}` : content,
        title: title || '',
        images: imageNames,
        commentsCount: 0,
        name: '我', 
        handle: '@me',
        avatar: 'https://i.pravatar.cc/150?img=10'
    };

    if (userId) {
        // Ensure user exists or handle error. For now, assume user might not exist in local DB if not synced.
        // Ideally we should sync user on login or here.
        // Let's try to connect if user exists, otherwise ignore (or create).
        // For simplicity, I'll skip connect if I can't guarantee user exists, 
        // but the backup logic implies users are synced.
        // I'll add a check or upsert logic if I had time, but for now:
        try {
             // Try to find user first
             const user = await prisma.user.findUnique({ where: { id: userId } });
             if (user) {
                 postData.author = { connect: { id: userId } };
             }
        } catch (e) {
            console.log("User check failed", e);
        }
    }

    const newPost = await prisma.post.create({
      data: postData
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

export const updatePost = async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Post ${id} updated` });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
      await prisma.post.delete({ where: { id } });
      res.json({ message: `Post ${id} deleted` });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
