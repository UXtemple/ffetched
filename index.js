var farfetched = require('farfetched');

module.exports = function mockFetch(uri, response, where) {
  var finalWhere = where || global;

  farfetched.attach(finalWhere);

  var id = farfetched(uri, {
    response: response
  });

  return function mockFetchCleanup() {
    farfetched.clear(id);
    farfetched.detach(finalWhere);
  }
}
