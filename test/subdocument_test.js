const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', done => {
    const user = new User({
      name: 'Joe',
      posts: [{ title: 'Post 1' }]
    });

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser.posts[0].title === 'Post 1');
        done();
      });
  });

  it('can add subdocuments to an existing record', done => {
    const user = new User({ name: 'Joe', posts: [] });

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        foundUser.posts.push({ title: 'New Post' });
        return foundUser.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser.posts[0].title === 'New Post');
        done();
      });
  });
});