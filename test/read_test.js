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
    User.find({ name: 'Joe' })
      .then(users => {
        // console.log(users);
        assert(users[0]._id.toString() === user._id.toString());
        done();
      });
  });

  it('finds a user with a particular id', done => {
    User.findOne({ _id: user._id })
      .then(foundUser => {
        assert(foundUser.name === 'Joe');
        done();
      });
  });
});