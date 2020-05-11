const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  let favoriteBlogObject = {
    title: "a",
    author: "b",
    likes: -1,
  };
  blogs.forEach((blog) => {
    if (blog.likes > favoriteBlogObject.likes) {
      favoriteBlogObject.title = blog.title;
      favoriteBlogObject.author = blog.author;
      favoriteBlogObject.likes = blog.likes;
    }
  });
  return favoriteBlogObject;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
