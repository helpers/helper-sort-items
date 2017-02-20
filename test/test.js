'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var assemble = require('assemble');
var sortItems = require('..');
var app;

var fixtures = path.join.bind(path, __dirname, 'fixtures');

describe('helper-sort-items', function() {
  beforeEach(function() {
    app = assemble();
    app.pages(fixtures('*.hbs'));
    app.helper('sortItems', sortItems);
  });

  it('should export a function', function() {
    assert.equal(typeof sortItems, 'function');
  });

  it('should sort items using the given `order`', function(cb) {
    app.render('index.hbs', {order: ['bar', 'foo', 'baz']}, function(err, view) {
      if (err) {
        cb(err);
        return;
      }

      assert.equal(view.content.trim(), 'bar\nfoo\nbaz');
      cb();
    });
  });

  it('should filter items to those on the given array', function(cb) {
    app.render('index.hbs', {order: ['foo', 'bar']}, function(err, view) {
      if (err) {
        cb(err);
        return;
      }

      assert.equal(view.content.trim(), 'foo\nbar');
      cb();
    });
  });

  it('should sort by the order given as the last argument to sortItems', function(cb) {
    app.render('order.hbs', {order: ['foo', 'bar']}, function(err, view) {
      if (err) {
        cb(err);
        return;
      }

      assert.equal(view.content.trim(), 'baz\nfoo');
      cb();
    });
  });

  it('should sort by the order given on the `order` hash argument', function(cb) {
    app.render('hash.hbs', {order: ['foo', 'bar']}, function(err, view) {
      if (err) {
        cb(err);
        return;
      }

      assert.equal(view.content.trim(), 'baz\nbar');
      cb();
    });
  });
});
