const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let user;
  beforeEach(done => {
    user = new User({ name: 'Joe' });
    user.save()
      .then(() => done());
  });

  it('instance type using set and save', done => {
    user.set('name', 'Alex');
    user.save()
      .then(() => User.find({}))
      .then(foundUsers => {
        assert(foundUsers.length === 1);
        assert(foundUsers[0].name === 'Alex');
        done();
      });
  });
});