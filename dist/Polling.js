'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ajax long-polling client
 */

var _angular = angular,
    bind = _angular.bind,
    copy = _angular.copy,
    extend = _angular.extend,
    forEach = _angular.forEach,
    isObject = _angular.isObject,
    isNumber = _angular.isNumber,
    isDefined = _angular.isDefined,
    isArray = _angular.isArray,
    isUndefined = _angular.isUndefined;


angular.module('Polling', []).factory('Polling', function ($http, $q) {
	var Polling = function () {
		function Polling(options) {
			_classCallCheck(this, Polling);

			//var settings = copy(pollingOtions);
			//Default value
			this.method = 'GET';
			this.reconnect = true;

			this._lasttime = new Date().toGMTString().replace(/UTC/, 'GMT');
			this._etag = 0;
			this._listen_timeout_timer = false;

			extend(this, options);

			if (!this._check()) {
				return false;
			}
		}

		_createClass(Polling, [{
			key: '_check',
			value: function _check() {
				if (!this.url) {
					throw new Error('option url is needed!');
				}

				return true;
			}
		}, {
			key: 'start',
			value: function start() {
				//cancel pre request first.
				this.request();
			}
		}, {
			key: 'cancel',
			value: function cancel() {
				this._canceler.resolve();
			}
		}, {
			key: 'request',
			value: function request() {
				var method = this.method.toUpperCase();
				var othis = this;
				this._canceler = $q.defer();
				switch (method) {
					case 'GET':
						$http.get(this.url, {
							timeout: this._canceler.promise,
							headers: {
								'If-None-Match': othis._etag,
								'If-Modified-Since': othis._lasttime
							}
						}).then(function (response) {

							othis.onComplete(response.data);

							var lastmodified = response.headers('Last-Modified');
							if (lastmodified) {
								othis._lasttime = lastmodified;
								othis._etag = response.headers('Etag');
							} else {
								othis._etag = 0;
							}
							console.info(response);
							othis.request();
						}).catch(function (error) {
							console.log(data);
						});

						break;
					case 'POST':
						//do nothing, not support now.
						break;

					default:
						break;
				}

				clearTimeout(this._listen_timeout_timer);
				this._listen_timeout_timer = setTimeout(function () {
					try {
						othis.cancel();
					} catch (e) {
						console.error(e);
					}
					othis.request();
				}, 55000);
			}
		}, {
			key: 'onComplete',
			value: function onComplete(data) {
				if (this.onUpdate && typeof this.onUpdate == 'function') {
					this.onUpdate.apply(this, [data]);
				}
			}
		}]);

		return Polling;
	}();

	return Polling;
});
