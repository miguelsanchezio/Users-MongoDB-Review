const assert = require('assert');
const User = require('../src/user');

describe('Reading records', () => {
  let user;
  beforeEach(done => {
    user = new User({ name: 'Joe' });
    user.save()
      .then(() => done());
  });

  it('finds all users with a name of joe', done => {
    User.findOne({ name: 'Joe' })
      .then(users => {
        console.log(users);
        done();
      });
  });
});