const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let user, blogPost;

  beforeEach(done => {
    user = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Javascript', content: 'JS is awesome.' });

    user.blogPosts.push(blogPost);

    Promise.all([user.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogposts on remove', done => {
    user.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});