"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by hgeorgiev on 8/8/16.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var wallpaper_model_1 = require('./wallpaper.model'); //improting the wallpaper model
var wallpaperlisting_model_1 = require('./wallpaperlisting.model'); //importing the wallpaper listing model
var RedditService = (function () {
    function RedditService(http) {
        this.http = http;
    }
    RedditService.prototype.getWallpapers = function (after) {
        var path = '//www.reddit.com/r/wallpapers.json?raw_json=1';
        // continues from last item loaded
        if (after)
            path += '&after=' + after;
        return this.http
            .get(path)
            .map(this.mapWallpapers);
    };
    RedditService.prototype.mapWallpapers = function (res) {
        var body = res.json();
        var listing = new wallpaperlisting_model_1.WallpaperListing();
        //iterate through the data
        var wallpapers = new Array();
        body.data.children.forEach(function (post) {
            if (post.data.post_hint === 'image') {
                var item = new wallpaper_model_1.Wallpaper();
                item.url = post.data.url;
                item.title = post.data.title;
                var previewImages = post.data.preview.images;
                var resolutions = post.data.preview.images[0].resolutions;
                var previewImage = resolutions.filter(function (m) { return m.width === 960; })[0];
                item.previewUrl = previewImage ? previewImage.url : item.url;
                wallpapers.push(item);
            }
        });
        listing.wallpapers = wallpapers;
        listing.after = body.data.after;
        return listing;
    };
    RedditService = __decorate([
        //importing the wallpaper listing model
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RedditService);
    return RedditService;
}());
exports.RedditService = RedditService;
