var proxyquire = require('proxyquire').noCallThru();
var sinon = require('sinon');
var test = require('tape');

var ID = 1;
var farfetchedSpies = sinon.stub().returns(ID);
farfetchedSpies.attach = sinon.spy();
farfetchedSpies.clear = sinon.spy();
farfetchedSpies.detach = sinon.spy();

var mockFetch = proxyquire('./index', {
  'farfetched': farfetchedSpies
});

test('#ffetched', function(t) {
  var unmockFetch = mockFetch('/', {data: true});

  t.ok(farfetchedSpies.attach.called, 'calls farfetched.attach');

  t.deepEquals(farfetchedSpies.firstCall.args, ['/', {
    response: {
      data: true
    }
  }], 'calls farfetched.attach with URI and response');

  t.equals(typeof unmockFetch, 'function', 'returns a function to clean things up');

  unmockFetch();

  t.equals(farfetchedSpies.clear.firstCall.args[0], ID, 'calls farfetched.clear with the id it got from farfetched');
  t.ok(farfetchedSpies.detach.called, 'calls farfetched.detach');

  var myGlobal = {
    ns: true
  };
  unmockFetch = mockFetch('/', {data: true}, myGlobal);

  t.deepEquals(farfetchedSpies.attach.secondCall.args[0], myGlobal, 'calls farfetched.attach with custom global');

  unmockFetch();

  t.deepEquals(farfetchedSpies.detach.secondCall.args[0], myGlobal, 'calls farfetched.detach with custom global');

  t.end();
});
