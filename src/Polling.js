/**
 * Ajax long-polling client
 */

let {
    bind,
    copy,
    extend,
    forEach,
    isObject,
    isNumber,
    isDefined,
    isArray,
    isUndefined
    } = angular;

angular.module('Polling', [])
.factory('Polling',function ($http, $q){

	class Polling{
		
		

		constructor(options){
			//var settings = copy(pollingOtions);
			//Default value
			this.method = 'GET';
			this.reconnect = true;

			this._lasttime = (new Date()).toGMTString().replace(/UTC/,'GMT');
			this._etag = 0;
			this._listen_timeout_timer = false;

			extend(this,  options);	

			if(!this._check()){
				return false;
			}				
		}

		_check () {
			if(!this.url){
				throw new Error('option url is needed!');  
			}

			return true;
		}

		start () {
			//cancel pre request first.
			this.request();
		}

		cancel () {
			this._canceler.resolve();
		}

		request () {
			let method = this.method.toUpperCase();
			let othis = this;
			this._canceler = $q.defer();
			switch(method){
				case 'GET':
					$http.get(this.url, {
						timeout: this._canceler.promise,
						headers: {
							'If-None-Match' : othis._etag,
							'If-Modified-Since' : othis._lasttime
						}
					})
					.then(function (response) {

						othis.onComplete(response.data);

						let lastmodified = response.headers('Last-Modified');
						if(lastmodified){
							othis._lasttime = lastmodified;
							othis._etag = response.headers('Etag');
						}else{
							othis._etag = 0;
						}
						console.info(response);
						othis.request();
					})
					.catch(function (error) {
						console.warn(error);
					});


					break;
				case 'POST':
					//do nothing, not support now.
					break;

				default:
					break;
			}

			clearTimeout(this._listen_timeout_timer);
			this._listen_timeout_timer = setTimeout(function(){
				try {
					othis.cancel();
				} catch(e){
					console.error(e);
				}			
				othis.request();
			},55000);
		}

		onComplete (data) {
			if(this.onUpdate && typeof this.onUpdate == 'function'){
				this.onUpdate.apply(this, [data]);
			}
		}
	}

	return Polling;
});