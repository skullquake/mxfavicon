define(
	[
		"dojo/_base/declare",
		"mxui/widget/_WidgetBase",
		"mxui/dom",
		"dojo/dom",
		"dojo/dom-prop",
		"dojo/dom-geometry",
		"dojo/dom-class",
		"dojo/dom-style",
		"dojo/dom-construct",
		"dojo/_base/array",
		"dojo/_base/lang",
		"dojo/text",
		"dojo/html",
		"dojo/_base/event",
		"mxfavicon/lib/jquery-1.11.2",
	],
	function(
		declare,
		_WidgetBase,
		dom,
		dojoDom,
		dojoProp,
		dojoGeometry,
		dojoClass,
		dojoStyle,
		dojoConstruct,
		dojoArray,
		lang,
		dojoText,
		dojoHtml,
		dojoEvent,
		_jQuery
	){
		"use strict";
		var $ = _jQuery.noConflict(true);
		return declare(
			"mxfavicon.widget.mxfavicon",
			[ _WidgetBase ],
			{
				_handles: null,
				_contextObj: null,
				constructor: function () {
					this._handles = [];
				},
				postCreate: function () {
				},
				update: function (obj, callback) {
					this._contextObj = obj;
					this._updateRendering(callback);
				},
				resize: function (box) {
				},
				uninitialize: function () {
					logger.debug(this.id + ".uninitialize");
				},
				_updateRendering: function (callback) {
					if (this._contextObj != null) {
						if(!this.bool_b64){
							var changedDate = new Date().getTime();
							var guid        = this._contextObj._guid;
							var href        = mx.homeUrl+'file?guid='+guid+'&changedDate='+changedDate;//+'&name='+this._contextObj.get('Name');
							var linkexists	= document.querySelector("link[rel*='icon']")!=null;
							var link        = document.querySelector("link[rel*='icon']")||document.createElement('link');
							link.type       = 'image/x-icon';
							link.rel        = 'shortcut icon';
							link.href       = href;
							if(!linkexists)document.head.appendChild(link);
						}else{
							function toDataUrl(url, callback) {
							    var xhr = new XMLHttpRequest();
							    xhr.onload = function() {
								var reader = new FileReader();
								reader.onloadend = function() {
								    callback(reader.result);
								}
								reader.readAsDataURL(xhr.response);
							    };
							    xhr.open('GET', url);
							    xhr.responseType = 'blob';
							    xhr.send();
							}
							var changedDate = new Date().getTime();
							var guid        = this._contextObj._guid;
							var href        = mx.homeUrl+'file?guid='+guid+'&changedDate='+changedDate;//+'&name='+this._contextObj.get('Name');
							toDataUrl(href,function(b64){
								var linkexists	= document.querySelector("link[rel*='icon']")!=null;
								var link        = document.querySelector("link[rel*='icon']")||document.createElement('link');
								link.type       = 'image/x-icon';
								link.rel        = 'shortcut icon';
								link.href       = b64;
								if(!linkexists)document.head.appendChild(link);
							});
						}
					} else {
						if(this.img_default!=null){
							if(!this.bool_b64){
								var changedDate = new Date().getTime();
								var href        = mx.homeUrl+this.img_default;
								var linkexists	= document.querySelector("link[rel*='icon']")!=null;
								var link        = document.querySelector("link[rel*='icon']")||document.createElement('link');
								link.type       = 'image/x-icon';
								link.rel        = 'shortcut icon';
								link.href       = href;
								if(!linkexists)document.head.appendChild(link);
							}else{
								function toDataUrl(url, callback) {
								    var xhr = new XMLHttpRequest();
								    xhr.onload = function() {
									var reader = new FileReader();
									reader.onloadend = function() {
									    callback(reader.result);
									}
									reader.readAsDataURL(xhr.response);
								    };
								    xhr.open('GET', url);
								    xhr.responseType = 'blob';
								    xhr.send();
								}
								var changedDate = new Date().getTime();
								var href        = mx.homeUrl+this.img_default;
								toDataUrl(href,function(b64){
									var linkexists	= document.querySelector("link[rel*='icon']")!=null;
									var link        = document.querySelector("link[rel*='icon']")||document.createElement('link');
									link.type       = 'image/x-icon';
									link.rel        = 'shortcut icon';
									link.href       = b64;
									if(!linkexists)document.head.appendChild(link);
								});
							}
						}else{
						}
					}
					this._executeCallback(callback, "_updateRendering");
				},
				_execMf: function (mf, guid, cb) {
					logger.debug(this.id + "._execMf");
					if (mf && guid) {
						mx.ui.action(mf, {
							params: {
								applyto: "selection",
								guids: [guid]
							},
							callback: lang.hitch(this, function (objs) {
								if (cb && typeof cb === "function") {
									cb(objs);
								}
							}),
							error: function (error) {
								console.debug(error.description);
							}
						}, this);
					}
				},
				_executeCallback: function (cb, from) {
					logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
					if (cb && typeof cb === "function") {
						cb();
					}
				}
			}
		);
	}
);
require(["mxfavicon/widget/mxfavicon"]);
