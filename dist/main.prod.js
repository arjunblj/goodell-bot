/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var slackEvents = exports.slackEvents = {
		init: "hello",
		message: "message"
	};

	var masterCommands = exports.masterCommands = {
		standings: "standings"
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(9);

	var _express2 = _interopRequireDefault(_express);

	var _slackbots = __webpack_require__(11);

	var _slackbots2 = _interopRequireDefault(_slackbots);

	var _events = __webpack_require__(1);

	var _message = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// On production, this is already set on process.env.
	if (false) {
	  require('dotenv').load();
	}

	var app = (0, _express2.default)();

	// For avoiding Heroku $PORT
	app.set('port', process.env.PORT || 5000);

	app.get('/', function (req, res) {
	  return res.redirect('https://github.com/arjunblj/goodell-bot');
	}).listen(app.get('port'), function () {
	  console.log('Running goodell-bot server...', app.get('port'));
	});

	var settings = {
	  token: process.env.SLACK_BOT_TOKEN,
	  name: 'goodellbot'
	};

	var goodell = new _slackbots2.default(settings);

	goodell.on('start', function () {
	  goodell.getUser('goodellbot').then(function () {
	    return listen(goodell);
	  }).catch(function (err) {
	    return console.error(err);
	  });
	});

	var listen = function listen(goodell) {
	  goodell.on('message', function (message) {
	    switch (message.type) {
	      case _events.slackEvents.message:
	        if (message.text.startsWith('<@' + goodell.self.id + '>')) {
	          (0, _message.respondMessage)(goodell, message);
	        }
	        break;
	    }
	  });
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.respondMessage = undefined;

	var _regenerator = __webpack_require__(8);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(7);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var getAccessToken = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	    var token;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _refreshToken.getRefreshedAccessToken)();

	          case 2:
	            token = _context.sent;
	            return _context.abrupt('return', token);

	          case 4:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function getAccessToken() {
	    return _ref.apply(this, arguments);
	  };
	}();

	var fetchMessage = function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(access_token) {
	    var message;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _utils.getStandings)(access_token);

	          case 2:
	            message = _context2.sent;
	            return _context2.abrupt('return', message);

	          case 4:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function fetchMessage(_x) {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var _events = __webpack_require__(1);

	var _utils = __webpack_require__(6);

	var _refreshToken = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var params = {
	  icon_url: 'https://s.yimg.com/dh/ap/fantasy/img/app_icon_144x144.jpg'
	};

	var respondMessage = exports.respondMessage = function respondMessage(bot, message) {
	  var parsedMessage = message.text.split(' ');
	  console.log(parsedMessage);
	  if (parsedMessage.indexOf('standings') > 0) {
	    getAccessToken().then(fetchMessage).then(function (messageToPost) {
	      var channelToPost = getChannelById(bot, message.channel);
	      bot.postMessageToChannel(channelToPost, messageToPost, params);
	    });
	  }
	};

	var getChannelById = function getChannelById(bot, id) {
	  return bot.channels.find(function (channel) {
	    return channel.id == id;
	  }).name;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getRefreshedAccessToken = undefined;

	var _promise = __webpack_require__(2);

	var _promise2 = _interopRequireDefault(_promise);

	var _request = __webpack_require__(10);

	var _request2 = _interopRequireDefault(_request);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (false) {
	  require('dotenv').load();
	}

	var formData = {
	  grant_type: 'refresh_token',
	  consumer_key: process.env.CONSUMER_KEY,
	  consumer_secret: process.env.CONSUMER_SECRET,
	  refresh_token: process.env.REFRESH_TOKEN
	};

	var headers = { Authorization: 'Basic ' + new Buffer(process.env.CONSUMER_KEY + ':' + process.env.CONSUMER_SECRET).toString('base64') };

	var getRefreshedAccessToken = exports.getRefreshedAccessToken = function getRefreshedAccessToken() {
	  return new _promise2.default(function (resolve, reject) {
	    _request2.default.post('https://api.login.yahoo.com/oauth2/get_token', {
	      headers: headers,
	      json: true,
	      form: formData
	    }, function (err, res, body) {
	      resolve(body.access_token);
	    });
	  });
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(2);

	var _promise2 = _interopRequireDefault(_promise);

	exports.getStandings = getStandings;

	var _yahooFantasyWithoutAuth = __webpack_require__(12);

	var _yahooFantasyWithoutAuth2 = _interopRequireDefault(_yahooFantasyWithoutAuth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var yf = new _yahooFantasyWithoutAuth2.default();

	function getStandings(access_token) {
	  return new _promise2.default(function (resolve, reject) {
	    yf.setUserToken(access_token);
	    yf.league.standings(process.env.LEAGUE_ID, function (err, resp) {
	      resolve(formatData(resp, 'standings'));
	    });
	  });
	}

	var formatData = function formatData(data, type) {
	  var formatted = '';
	  if (type == 'standings') {
	    var output = ':trophy: :football:    *Current Standings, Week ' + data.current_week + '*    :football: :trophy:';
	    data.standings.forEach(function (team, i) {
	      output += '\n' + (i + 1) + '. _' + team.name + '_ | waiver priority ' + team.waiver_priority + ' — ' + team.number_of_moves + ' moves — ' + team.number_of_trades + ' trades.';
	    });
	    formatted += output;
	  }
	  return formatted;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("slackbots");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("yahoo-fantasy-without-auth");

/***/ }
/******/ ]);