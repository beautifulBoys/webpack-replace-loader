
var loaderUtils = require('loader-utils');

// Characters needed to escape
var escapeArray = ['/', '[', ']', '-', '.', '(', ')', '$', '^', '*', '+', '?', '|', '{', '}'];

function warning (num) {
  var arr = [
    '[webpack-replace-loader: warning] The configuration rule of webpack is not allowed! -> https://github.com/beautifulBoys/webpack-replace',
    '[webpack-replace-loader: warning] The property "search" and "replace" is essential'
  ];
  throw new Error(arr[num]);
}
// The string that needs to be matched is escaped
function stringEscape (str) {

  let stringArray = str.toString().split('');

  for (let j = 0; j < stringArray.length; j++) {
    for (let i = 0; i < escapeArray.length; i++) {

      if (stringArray[j] === escapeArray[i]) {
        stringArray[j] = '\\' + escapeArray[i];
      }

    }
  }

  return stringArray.join('');
}

module.exports = function (source, map) {
  this.cacheable();
  var options = loaderUtils.getOptions(this);

  if (!options.arr) {
    warning(0);
  } else {
    for (let i = 0; i < options.arr.length; i++) {
      if (!options.arr[i].replace || !options.arr[i].search) {
        warning(1);
      } else {
        let replace = options.arr[i].replace;
        let search = options.arr[i].search;
        let attr;

        if (options.arr[i].hasOwnProperty('attr')) {
          attr = options.arr[i].attr;
        } else if (options.hasOwnProperty('attr') && !options.arr[i].hasOwnProperty('attr')) {
          attr = options.attr;
        } else {
          attr = '';
        }

        source = source.replace(new RegExp(stringEscape(search), attr), replace);
      }
    }
  }

  this.callback(null, source, map);
  return source;
};
