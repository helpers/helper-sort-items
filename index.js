'use strict';

var extend = require('extend-shallow');
var isobject = require('isobject');
var slugify = require('markdown-slug');

/**
 * Helper for sorting pages before rendering. The `slugify`
 * function is used to normalize the names before the comparison
 * is done.
 */

module.exports = function(items, order, options) {
  if (isobject(order) && order.hash) {
    options = order;
    order = null;
  }

  if (!Array.isArray(items)) {
    return [];
  }

  options = options || {};
  var opts = extend({}, this.context, this.options, options.hash);
  order = order || opts.order;

  if (typeof order === 'string') {
    order = order.split(',');
  }

  if (!Array.isArray(order)) {
    return items;
  }

  var len = order.length;
  var arr = [];

  for (var i = 0; i < len; i++) {
    var item = pluckItem(items, slugify(order[i]));
    if (item) {
      arr.push(item);
    }
  }
  return arr;
};

function pluckItem(items, name) {
  var len = items.length;
  for (var i = 0; i < len; i++) {
    var item = items[i];
    if (typeof item === 'string') {
      if (slugify(item) === name) return item;
      continue;
    }

    if (slugify(item.stem) === name) {
      return item;
    }
  }
}
