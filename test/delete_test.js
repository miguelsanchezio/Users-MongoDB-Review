const assert = require('assert');
const User = require('../src/user');

describe('Deleting records', () => {
  let user;
  beforeEach(done => {
    user = new User({ name: 'Joe' });
    user.save()
      .then(() => done());
  });

  it('model instance remove', done => {
    user.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser === null);
        done();
      });
  });

  it('class method remove', done => {
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser === null);
        done();
      });
  });

  it('class method findOneAndRemove', done => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser === null);
        done();
      });
  });

  it('class method findByIdAndRemove', done => {
    User.findByIdAndRemove(user._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then(foundUser => {
        assert(foundUser === null);
        done();
      });
  });
});