const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let user, blogPost, comment;

  beforeEach(done => {
    user = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Javascript', content: 'JS is awesome.' });
    comment = Comment({ content: 'Yeah I agree on that.' });

    user.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = user;

    Promise.all([user.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it.only('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .then(foundUser => {
        console.log(foundUser);
        done();
      });
  });
})