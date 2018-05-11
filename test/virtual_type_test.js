const assert = require('assert')
const User = require('../src/user');

describe('Virtual types', () => {
  it('postCount returns number of posts', done => {
    const user = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser.postCount === 1);
        done();
      });
  });
});