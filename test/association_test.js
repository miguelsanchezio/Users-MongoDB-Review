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

  it('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(foundUser => {
        assert(user.blogPosts[0].title === 'Javascript')
        done();
      });
  });

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(foundUser => {
        assert(foundUser.name === 'Joe');
        assert(foundUser.blogPosts[0].title === 'Javascript');
        assert(foundUser.blogPosts[0].comments[0].content === 'Yeah I agree on that.');
        assert(foundUser.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});