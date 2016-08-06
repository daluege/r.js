var test = require('tape');
var Record = require('../src/r.js');

test('record', (t) => {

  var record = new Record; // Creates a branch without existing target
  record((name) => undefined); // Function that accepts anything

  t.test('function result', (t) => {
    function handler(a) { 2*a }
    var result = new Record()(handler);

    t.notEqual(result, handler, 'should be encapsulated');
    t.equal(result(8), handler(8), 'should return same result as the handler');

    record('input', 'block', () => undefined);
    var value1 = record('input', 'block')().valueOf();
    record('input', 'block', () => this);
    var value2 = record('input', 'block')().valueOf();

    t.equal(value1, value2, 'should cause equal behavior for `undefined` and `this` in line with the `new` operator');
    t.end();
  });

  t.test('installation and selection', (t) => {
    var record = new Record,
      installation = record('weather', 'today'),
      selection = record('weather', 'today'),
      reselection = record('weather', 'today');

    t.equal(installation, selection, 'should have equal values');
    t.equal(selection, reselection, 'should return the installed record on subsequent calls');
    t.end();
  });

  t.test('call arguments', (t) => {
    var value = 24713308211,
      key = record('http://google.com', value),
      existingKey = record('http://google.com', value),
      value = record('http://google.com')(value),
      existingValue = record('http://google.com')();

    t.equal(key.toString(), 'http://google.com', 'should return the uppermost identifier');
    t.notEqual(key.valueOf(), value, 'should not return newly created value atoms nor the last argument');
    t.equal(value.valueOf(), value, 'should give access to a value when called in a separate context');
    t.equal(existingValue.valueOf(), value, 'should behave equally when existing values are selected');
    t.equal(existingValue.valueOf(), 'http://google.com', 'should behave equally with multiple existing arguments');
    t.end();
  });

  t.test('order relation and target overriding', (t) => {
    var acceptor,
      change = record('http://', 'change.org'),
      abc = record('http://', 'abc.xyz');

    // Default acceptor compares valueOf() by < operator
    change('/');
    t.throws(() => record('http://', 'change.org', '\n'), Error, 'should not accept values that compare lesser');
    t.doesNotThrow(() => record('http://', 'change.org', '?'), null, 'should accept values that do not compare lesser');
    t.doesNotThrow(() => acceptor = record('http://', 'change.org', () => ':'), null, 'should accept functions over strings')
    t.equal(record('http://change.org').valueOf(), ':', 'should install functions as acceptor');

    abc('/');
    t.doesNotThrow(() => acceptor = record('http://', 'abc.xyz', {}), null, 'should accept objects over strings')
    t.doesNotThrow(() => acceptor = record('http://', 'abc.xyz', () => ':'), null, 'should accept functions over objects')
    t.doesNotThrow(() => acceptor = record('http://', 'abc.xyz', {}), null, 'should not accept objects over functions')
    t.end();
  });

  t.test('argument hierarchy', (t) => {
    var search1 = record('http://', 'www.google.com', () => this, '/search');
    var search2 = record('http://', 'www.google.com', '/search');
    var search3 = record('http://www.google.com/search');
    var search4 = record('http', '://www.google.com/search');

    t.equal(search1, search2, 'subsequent arguments should be applied on previous arguments');
    t.equal(search2, search3, 'should match prefixes');
    t.notEqual(search3, search4, 'should not match non-existing partitions');
    t.end();
  });

  t.test('path and value', (t) => {
    var bin = record('/usr', '/bin');
    var etc = record('/usr', '/etc');

    t.equal(bin.toString(), '/usr/bin', 'should return the full path');
    t.equal(etc.toString(), '/usr', 'should return the portion that uniquely identifies the record');
    t.equal(record(bin.toString()), bin);
    t.equal(record(etc.toString()), etc);
    t.end();
  });

  t.test('branch', (t) => {
    var block = new Record('block', true);
    t.notEqual(Record('block').valueOf(), block.valueOf(), 'should not affect the underlying tree');

    t.test('block', (t) => {
      record('block', 1, 2);
      t.equal(block.toString(), 'block', 'should equal the block root');
    });
    t.end();
  });
  t.end();
});
