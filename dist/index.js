'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import CONFIG from './config.json';

//import { Polling } from "./Polling";

var _angular = angular,
    bind = _angular.bind,
    copy = _angular.copy,
    extend = _angular.extend,
    forEach = _angular.forEach,
    isObject = _angular.isObject,
    isNumber = _angular.isNumber,
    isDefined = _angular.isDefined,
    isArray = _angular.isArray,
    isUndefined = _angular.isUndefined,
    element = _angular.element;


angular.module('Polling', []).factory('Polling', function () {
	var Polling = function () {
		function Polling(options) {
			_classCallCheck(this, Polling);

			//var settings = copy(pollingOtions);

			extend(this, options);
		}

		_createClass(Polling, [{
			key: 'test',
			value: function test(a) {
				window.console.log("Polling test: options.url:" + this.url + " func parameter: " + a);
			}
		}]);

		return Polling;
	}();

	return Polling;
});