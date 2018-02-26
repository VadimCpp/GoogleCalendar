/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _googlecalendar = __webpack_require__(1);

var _googlecalendar2 = _interopRequireDefault(_googlecalendar);

var _simpleview = __webpack_require__(2);

var _simpleview2 = _interopRequireDefault(_simpleview);

var _detailedview = __webpack_require__(3);

var _detailedview2 = _interopRequireDefault(_detailedview);

var _calendarview = __webpack_require__(4);

var _calendarview2 = _interopRequireDefault(_calendarview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing an App.
 */
var App = function () {

  /**
   * @param {{ apiKey: !string, calendarId: !string }} config
   * @public
   */
  function App(config) {
    _classCallCheck(this, App);

    var that = this;

    /**
     * @type {!GoogleCalendar}
     * @private
     */
    this._googleCalendar = new _googlecalendar2.default({ apiKey: apiKey, calendarId: calendarId });
  }

  /**
   * Request Google Calendar data and render information.
   *   
   * @public
   */


  _createClass(App, [{
    key: 'start',
    value: function start() {
      var that = this;

      document.getElementById('btn-load').addEventListener('click', function (e) {
        that.updateSchedule();
      });

      that.updateSchedule();
    }

    /**
     * Update the schedule.
     * @public
     */

  }, {
    key: 'updateSchedule',
    value: function updateSchedule() {
      var _this = this;

      this.disableButtons();
      this.displayProgress();
      this.hideError();

      this._googleCalendar.load(function (success) {
        if (success) {
          _this.hideProgress();
          _this.enableButtons();
          _this.displayData();
        } else {
          _this.hideProgress();
          _this.enableButtons();
          _this.displayError();
        }
      });
    }

    /**
     * @public
     */

  }, {
    key: 'disableButtons',
    value: function disableButtons() {
      document.getElementById('btn-load').classList.add('disabled');
      document.getElementById('btn-copy').classList.add('disabled');
    }

    /**
     * @public
     */

  }, {
    key: 'enableButtons',
    value: function enableButtons() {
      document.getElementById('btn-load').classList.remove('disabled');
      document.getElementById('btn-copy').classList.remove('disabled');
    }

    /**
     * @public
     */

  }, {
    key: 'displayProgress',
    value: function displayProgress() {
      document.getElementById('view-progress').classList.remove('container_hidden');
    }

    /**
     * @public
     */

  }, {
    key: 'hideProgress',
    value: function hideProgress() {
      document.getElementById('view-progress').classList.add('container_hidden');
    }

    /**
     * @public
     */

  }, {
    key: 'displayError',
    value: function displayError() {
      document.getElementById('view-error').classList.remove('container_hidden');
    }

    /**
     * @public
     */

  }, {
    key: 'hideError',
    value: function hideError() {
      document.getElementById('view-error').classList.add('container_hidden');
    }
  }, {
    key: 'displayData',
    value: function displayData() {
      /**
       * @type {!SimpleView}
       */
      var simpleView = new _simpleview2.default('simple-view');

      simpleView.render(this._googleCalendar.getData());

      /**
       * @type {!DetailedView}
       */
      var detailedView = new _detailedview2.default('detailed-view');

      detailedView.render(this._googleCalendar.getData());

      /**
       * @type {!CalendarView}
       */
      var calendarView = new _calendarview2.default('calendar-view');

      calendarView.render(this._googleCalendar.getData());
    }
  }]);

  return App;
}();

/**
 * From Google Developer Console
 * @type {!string}
 */


var apiKey = "AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs";

/**
 * From Google Calendar Web App
 * @type {!string}
 */
var calendarId = "dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com";

/**
 * @type {!App}
 */
var app = void 0;

window.onload = function () {
  app = new App({ apiKey: apiKey, calendarId: calendarId });
  app.start();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class only loads GoogleCalendar data.
 */
var GoogleCalendar = function () {
  function GoogleCalendar(requestConfig) {
    _classCallCheck(this, GoogleCalendar);

    /**
     * @type {!string}
     * @private
     */
    this._calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/' + requestConfig.calendarId + '/events?key=' + requestConfig.apiKey,

    /**
     * @type {!string}
     * @private
     */
    this._timeMin = '2016-06-03T10:00:00-07:00';

    /**
     * @type {!string}
     * @private
     */
    this._timeMax = '2020-06-03T10:00:00-07:00';

    /**
     * @type {!boolean}
     * @private
     */
    this._recurringEvents = true;

    /**
     * @type {!Object}
     * @private
     */
    this._data = null;
  }

  /**
   * Gets JSON from Google Calendar and transfroms it into html list items and appends it to past or upcoming events list
   * @param { !function( !boolean, ?Object ) }
   * @public
   */


  _createClass(GoogleCalendar, [{
    key: 'load',
    value: function load(callback) {
      var _this = this;

      /**
       * @type {!string}
       */
      var finalURL = this._calendarUrl;

      finalURL = finalURL.concat('&singleEvents=true&orderBy=starttime');
      finalURL = finalURL.concat('&timeMin=' + this._timeMin);
      finalURL = finalURL.concat('&timeMax=' + this._timeMax);

      /**
       * @type {!XMLHttpRequest}
       */
      var request = new XMLHttpRequest();

      request.open('GET', finalURL, true);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {

          _this._data = JSON.parse(request.responseText);;
          callback(true, _this._data);
        } else {
          console.error(err);
          callback(false, null);
        }
      };

      request.onerror = function () {
        console.error(err);
        callback(false, null);
      };

      request.send();
    }
  }, {
    key: 'getData',


    /**
     * @return {?Object}
     * @public
     */
    value: function getData() {
      return this._data;
    }
  }]);

  return GoogleCalendar;
}();

exports.default = GoogleCalendar;
;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class SimpleView renders calendar events.
 */
var SimpleView = function () {

  /**
   * @param {!string} elementId
   * @public
   */
  function SimpleView(elementId) {
    _classCallCheck(this, SimpleView);

    /**
     * @type {!string}
     * @private
     */
    this._elementId = elementId;
  }

  /**
   * @param {!Object} data
   * @public
   */


  _createClass(SimpleView, [{
    key: 'render',
    value: function render(data) {

      if (!data) {
        console.warn('SimpleView: cannot render null object. Skipped!');
        return;
      }

      /**
       * The maximum number of events allowed to display
       *
       * @const {!number}
       */
      var upcomingTopN = 10;

      /**
       * @type {!Element}
       */
      var element = document.getElementById(this._elementId);

      /**
       * @type {!Array}
       */
      var result = [];

      /**
       * @type {!Array}
       */
      var upcomingResultTemp = [];

      /**
       * @type {!Array}
       */
      var upcomingResult = [];

      /**
       * @type {!number}
       */
      var upcomingCounter = 0;

      // Remove cancelled events, sort by date
      result = data.items.filter(function (item) {
        return item && item.hasOwnProperty('status') && item.status !== 'cancelled';
      }).sort(this._comp).reverse();

      var i = void 0;

      for (i in result) {
        if (!this._isPast(result[i].end.dateTime || result[i].end.date)) {
          upcomingResultTemp.push(result[i]);
        }
      }

      upcomingResultTemp.reverse();

      for (i in upcomingResultTemp) {
        if (upcomingCounter < upcomingTopN) {
          upcomingResult.push(upcomingResultTemp[i]);
          upcomingCounter++;
        }
      }

      /**
       * @type {!string}
       */
      var innerHTML = '<h1 class="h2"> Анонс мероприятий </h1>';

      for (i in upcomingResult) {
        innerHTML += this._transformToParagraph(upcomingResult[i]);
      }

      innerHTML += '<p> Подробнее ➡️ <a href="//events4friends.ru/">events4friends.ru</a> </p>';

      element.innerHTML = innerHTML;
    }

    /**
     * Check if date is later then now
     *
     * @param {!Date} date
     * @return {!boolean}
     * @private
     */

  }, {
    key: '_isPast',
    value: function _isPast(date) {
      /**
       * @type {!string}
       */
      var compareDate = new Date(date);

      /**
       * @type {!string}
       */
      var now = new Date();

      if (now.getTime() > compareDate.getTime()) {
        return true;
      }

      return false;
    }
  }, {
    key: '_comp',


    /**
     * Compare dates.
     *
     * @param {!Object} a
     * @param {!Object} b
     * @return {!number}
     * @private
     */
    value: function _comp(a, b) {
      return new Date(a.start.dateTime || a.start.date).getTime() - new Date(b.start.dateTime || b.start.date).getTime();
    }

    /**
     * Transforms record to a line
     *
     * @param {!Object} event
     * @return {!string}
     * @private
     */

  }, {
    key: '_transformToParagraph',
    value: function _transformToParagraph(event) {
      /**
       * @type {!string}
       */
      var retVal = '<p>';

      /**
       * @type {!Array}
       */
      var dateStart = this._getDateInfo(event.start.dateTime || event.start.date);

      retVal += this._getSimpleFormattedDate(dateStart);;
      retVal += ' － ';
      retVal += '«' + event.summary + '»';
      retVal += ', ';

      retVal += this._getSimpleLocation(event.location || ''), retVal += '</p>';

      return retVal;
    }

    /**
     * Get temp array with information abou day in followin format: [day number, month number, year, hours, minutes]
     *
     * @type {!string} startDate
     * @return {!Array}
     * @private
     */

  }, {
    key: '_getDateInfo',
    value: function _getDateInfo(startDate) {
      /**
       * @type {!Date}
       */
      var date = new Date(startDate);

      return [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), 0, 0];
    }
  }, {
    key: '_getSimpleFormattedDate',


    /**
     * @type {!Array} dateStart
     * @return {!string} - date, month, day, time
     * @private
     */
    value: function _getSimpleFormattedDate(dateStart) {
      /**
       * @type {!string}
       */
      var formattedTime = '🕗&nbsp;&nbsp;' + this._getFormattedTime24(dateStart);

      /**
       * @type {!string}
       */
      var dayNameStart = this._getDayNameFormatted(dateStart);

      return '📅&nbsp;&nbsp;' + dateStart[0] + ' ' + this._getMonthName(dateStart[1]) + ', ' + dayNameStart + ' ' + formattedTime;
    }

    /**
     * @type {!Array} date
     * @return {!string} - hh:mm
     * @private
     */

  }, {
    key: '_getFormattedTime24',
    value: function _getFormattedTime24(date) {
      var formattedTime = '',
          hour = date[3],
          minute = date[4];

      // Ensure 2-digit minute value.
      minute = (minute < 10 ? '0' : '') + minute;

      // Ensure 2-digit hour value.
      hour = (hour < 10 ? '0' : '') + hour;

      // Format time.
      formattedTime = hour + ':' + minute;

      return formattedTime;
    }

    /**
     * @type {!Array} dateFormatted
     * @return {!string} - ????
     * @private
     */

  }, {
    key: '_getDayNameFormatted',
    value: function _getDayNameFormatted(dateFormatted) {

      return this._getDayName(this._getDateFormatted(dateFormatted).getDay()) + ' ';
    }

    /**
     * @type {!number} day
     * @return {!string} - week day
     * @private
     */

  }, {
    key: '_getDayName',
    value: function _getDayName(day) {

      /**
       * @type {!Array}
       */
      var dayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

      return dayNames[day];
    }
  }, {
    key: '_getDateFormatted',


    /**
     * @type {!Array} dateInfo
     * @return {!Date}
     * @private
     */
    value: function _getDateFormatted(dateInfo) {

      return new Date(dateInfo[2], dateInfo[1], dateInfo[0], dateInfo[3], dateInfo[4] + 0, 0);
    }

    /**
     * Get month name according to index.
     *
     * @type {!number} month
     * @return {!string}
     * @private
     */

  }, {
    key: '_getMonthName',
    value: function _getMonthName(month) {

      /**
       * @type {!Array}
       */
      var monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

      return monthNames[month];
    }
  }, {
    key: '_getSimpleLocation',


    /**
     * @type {!string} location
     * @return {!string}
     * @private
     */
    value: function _getSimpleLocation(location) {

      /**
       * @type {!string}
       */
      var simpleLocation = '';

      /**
       * @type {!number}
       */
      var secondCommaPosition = location.indexOf(',', location.indexOf(',', 0) + 1);

      if (secondCommaPosition > 0) {
        simpleLocation = location.substr(0, secondCommaPosition);
      }

      return '📍&nbsp;&nbsp;' + simpleLocation;
    }
  }]);

  return SimpleView;
}();

exports.default = SimpleView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class DetailedView renders calendar events.
 */
var DetailedView = function () {

  /**
   * @param {!string} elementId
   * @public
   */
  function DetailedView(elementId) {
    _classCallCheck(this, DetailedView);

    /**
     * @type {!string}
     * @private
     */
    this._elementId = elementId;
  }

  /**
   * @param {!Object} data
   * @public
   */


  _createClass(DetailedView, [{
    key: 'render',
    value: function render(data) {

      if (!data) {
        console.warn('SimpleView: cannot render null object. Skipped!');
        return;
      }

      /**
       * The maximum number of events allowed to display
       *
       * @const {!number}
       */
      var upcomingTopN = 10;

      /**
       * @type {!Element}
       */
      var element = document.getElementById(this._elementId);

      /**
       * @type {!Array}
       */
      var result = [];

      /**
       * @type {!Array}
       */
      var upcomingResultTemp = [];

      /**
       * @type {!Array}
       */
      var upcomingResult = [];

      /**
       * @type {!number}
       */
      var upcomingCounter = 0;

      // Remove cancelled events, sort by date
      result = data.items.filter(function (item) {
        return item && item.hasOwnProperty('status') && item.status !== 'cancelled';
      }).sort(this._comp).reverse();

      var i = void 0;

      for (i in result) {
        if (!this._isPast(result[i].end.dateTime || result[i].end.date)) {
          upcomingResultTemp.push(result[i]);
        }
      }

      upcomingResultTemp.reverse();

      for (i in upcomingResultTemp) {
        if (upcomingCounter < upcomingTopN) {
          upcomingResult.push(upcomingResultTemp[i]);
          upcomingCounter++;
        }
      }

      /**
       * @type {!string}
       */
      var innerHTML = '<h1 class="h2"> Подробно </h1>';

      for (i in upcomingResult) {
        innerHTML += this._transformToArticle(upcomingResult[i]);
      }

      element.innerHTML = innerHTML;
    }

    /**
     * Check if date is later then now
     *
     * @param {!Date} date
     * @return {!boolean}
     * @private
     */

  }, {
    key: '_isPast',
    value: function _isPast(date) {
      /**
       * @type {!string}
       */
      var compareDate = new Date(date);

      /**
       * @type {!string}
       */
      var now = new Date();

      if (now.getTime() > compareDate.getTime()) {
        return true;
      }

      return false;
    }
  }, {
    key: '_comp',


    /**
     * Compare dates.
     *
     * @param {!Object} a
     * @param {!Object} b
     * @return {!number}
     * @private
     */
    value: function _comp(a, b) {
      return new Date(a.start.dateTime || a.start.date).getTime() - new Date(b.start.dateTime || b.start.date).getTime();
    }

    /**
     * Transforms record to a line
     *
     * @param {!Object} event
     * @return {!string}
     * @private
     */

  }, {
    key: '_transformToArticle',
    value: function _transformToArticle(event) {
      /**
       * @type {!string}
       */
      var retVal = '<article class="mt-5 mb-5">';
      retVal += '<h2 class="h4 mb-0">' + '«' + event.summary + '»' + '</h2>';
      retVal += '<div>';

      /**
       * @type {!Array}
       */
      var dateStart = this._getDateInfo(event.start.dateTime || event.start.date);

      retVal += this._getFullFormattedDate(dateStart);

      retVal += '<p>' + event.description + '</p>';

      retVal += this._getFullLocation(event.location || ''), retVal += '</div>';
      retVal += '</article>';

      return retVal;
    }

    /**
     * Get temp array with information abou day in followin format: [day number, month number, year, hours, minutes]
     *
     * @type {!string} startDate
     * @return {!Array}
     * @private
     */

  }, {
    key: '_getDateInfo',
    value: function _getDateInfo(startDate) {
      /**
       * @type {!Date}
       */
      var date = new Date(startDate);

      return [date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), 0, 0];
    }
  }, {
    key: '_getFullFormattedDate',


    /**
     * @type {!Array} dateStart
     * @return {!string} - date, month, year, day, time
     * @private
     */
    value: function _getFullFormattedDate(dateStart) {
      /**
       * @type {!string}
       */
      var formattedTime = ' в ' + this._getFormattedTime24(dateStart);

      /**
       * @type {!string}
       */
      var dayNameStart = this._getDayNameFormatted(dateStart);

      return '<p>' + dateStart[0] + ' ' + this._getMonthName(dateStart[1]) + ' ' + dateStart[2] + ', ' + dayNameStart + ' ' + formattedTime + '</p>';
    }

    /**
     * @type {!Array} date
     * @return {!string} - hh:mm
     * @private
     */

  }, {
    key: '_getFormattedTime24',
    value: function _getFormattedTime24(date) {
      var formattedTime = '',
          hour = date[3],
          minute = date[4];

      // Ensure 2-digit minute value.
      minute = (minute < 10 ? '0' : '') + minute;

      // Ensure 2-digit hour value.
      hour = (hour < 10 ? '0' : '') + hour;

      // Format time.
      formattedTime = hour + ':' + minute;

      return formattedTime;
    }

    /**
     * @type {!Array} dateFormatted
     * @return {!string} - ????
     * @private
     */

  }, {
    key: '_getDayNameFormatted',
    value: function _getDayNameFormatted(dateFormatted) {

      return this._getDayName(this._getDateFormatted(dateFormatted).getDay()) + ' ';
    }

    /**
     * @type {!number} day
     * @return {!string} - week day
     * @private
     */

  }, {
    key: '_getDayName',
    value: function _getDayName(day) {

      /**
       * @type {!Array}
       */
      var dayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

      return dayNames[day];
    }
  }, {
    key: '_getDateFormatted',


    /**
     * @type {!Array} dateInfo
     * @return {!Date}
     * @private
     */
    value: function _getDateFormatted(dateInfo) {

      return new Date(dateInfo[2], dateInfo[1], dateInfo[0], dateInfo[3], dateInfo[4] + 0, 0);
    }

    /**
     * Get month name according to index.
     *
     * @type {!number} month
     * @return {!string}
     * @private
     */

  }, {
    key: '_getMonthName',
    value: function _getMonthName(month) {

      /**
       * @type {!Array}
       */
      var monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

      return monthNames[month];
    }
  }, {
    key: '_getFullLocation',


    /**
     * @type {!string} location
     * @return {!string}
     * @private
     */
    value: function _getFullLocation(location) {
      return '<p>' + '📍&nbsp;&nbsp;' + location + '</p>';
    }
  }]);

  return DetailedView;
}();

exports.default = DetailedView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class CalendarView renders full calendar.
 */
var CalendarView = function () {

  /**
   * @param {!string} elementId
   * @public
   */
  function CalendarView(elementId) {
    _classCallCheck(this, CalendarView);

    /**
     * @type {!string}
     * @private
     */
    this._elementId = elementId;

    /**
     * @type {?Object} data
     * @private
     */
    this._data = null;
  }

  /**
   * @param {!Object} data
   * @public
   */


  _createClass(CalendarView, [{
    key: 'render',
    value: function render(data) {
      /**
       * @type {!CalendarView}
       */
      var that = this;

      that._data = data;

      console.log('TEST');
      console.log(data);

      /**
       * Init and render Kendo UI calendar
       */

      $('#calendar-view').kendoCalendar();
    }
  }]);

  return CalendarView;
}();

exports.default = CalendarView;
;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map