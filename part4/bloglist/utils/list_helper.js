const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  const favoriteBlogObject = {
    title: 'a',
    author: 'b',
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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  const authorBlogsArray = _.chain(_.map(blogs, 'author'))
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value();
  const authorWithMostBlogs = {
    author: authorBlogsArray[0],
    blogs: authorBlogsArray[1],
  };
  return authorWithMostBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
