"use strict";function extendObject(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}!function(a){function b(){}b.prototype={_getGeoData:function(a,b,c){a.geocode({address:b},function(a,b){b==google.maps.GeocoderStatus.OK?c(a[0].geometry.location):alert("Geocode was not successful for the following reason: "+b)})}},b.prototype.getData=function(){return this.data},a.app.Model=b}(window),function(a){function b(){}b.prototype={_renderSearchResults:function(){if(this.imageSearch.results&&this.imageSearch.results.length>0){1==this.searchPage&&(this.imgColLeft=document.createElement("div"),this.imgColRight=document.createElement("div"),this.resultsWrapper.appendChild(this.imgColLeft),this.resultsWrapper.appendChild(this.imgColRight));for(var a=this.imageSearch.results,b=0;b<a.length;b++){var c=a[b],d=document.createElement("div"),e=document.createElement("img");e.onload=function(){this.style.opacity=1},e.src=c.url,d.appendChild(e),0==b%2?this.imgColLeft.appendChild(d):this.imgColRight.appendChild(d)}}this._showSearchResults()}},a.app.View=b}(window),function(a){function b(a,b){this.view=a,this.model=b}b.prototype={_init:function(){this.searchPage=1,this.resultsWrapper=document.getElementById("search-results"),this.mapWrapper=document.getElementById("map-container"),this.searchInput=document.getElementById("search-input"),this._initMap(),this._initSearch(),this._initEvents()},_initEvents:function(){this.events.addEventListener(a,"scroll",this.events.onScroll,this)},_initMap:function(){this.geocoder=new google.maps.Geocoder;var a=[{stylers:[{hue:"#fe4400"}]},{featureType:"water",stylers:[{color:"#1b2430"}]}],b={zoom:8,center:new google.maps.LatLng(45.352145,32.915039),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:a};this.map=new google.maps.Map(this.mapWrapper,b),this.autocomplete=new google.maps.places.Autocomplete(this.searchInput),this.autocomplete.bindTo("bounds",this.map),this.autocomplete.setTypes(["geocode"]),this._initAutocomplete()},_initSearch:function(){this.imageSearch=new google.search.ImageSearch,this.imageSearch.setRestriction(google.search.ImageSearch.RESTRICT_IMAGESIZE,google.search.ImageSearch.IMAGESIZE_LARGE),this.imageSearch.setResultSetSize(8),this.imageSearch.setSearchCompleteCallback(this,this.view._renderSearchResults,null)},_initAutocomplete:function(){var a=this;google.maps.event.addListener(this.autocomplete,"place_changed",function(){var b=new google.maps.Marker({map:a.map,animation:google.maps.Animation.DROP});b.setVisible(!1),a._hideSearchResults(),a.searchInput.className="";var c=a.autocomplete.getPlace();return c.geometry?(c.geometry.viewport?a.map.fitBounds(c.geometry.viewport):(a.map.setCenter(c.geometry.location),a.map.setZoom(17)),b.setPosition(c.geometry.location),b.setVisible(!0),google.maps.event.addListener(b,"click",function(){a.imageSearch.execute(a.searchInput.value)}),void 0):(a.searchInput.className="error",void 0)})},_hideSearchResults:function(){this.resultsWrapper.style.display="none",this.resultsWrapper.innerHTML="",this.searchPage=1},_showSearchResults:function(){this.resultsWrapper.style.display="block"},events:{addEventListener:function(a,b,c,d){var e=d?function(a){c.apply(d,[a])}:c;document.addEventListener?a.addEventListener(b,e,!1):document.attachEvent&&a.attachEvent("on"+b,e)},onScroll:function(){var a=Math.max(document.documentElement.scrollTop,document.body.scrollTop);a+document.documentElement.clientHeight>=document.documentElement.scrollHeight-100&&this.imageSearch.gotoPage(this.searchPage++)}}},a.app.Controller=b}(window),function(){function a(a){this.model=new app.Model,this.view=new app.View(this.model),this.controller=new app.Controller(this.view,this.model,a),this.controller._init()}new a}();