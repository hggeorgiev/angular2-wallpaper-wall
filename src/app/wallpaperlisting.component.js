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
var reddit_service_1 = require('./reddit.service');
var angular2_infinite_scroll_1 = require('angular2-infinite-scroll');
var wallpaperlisting_model_1 = require('./wallpaperlisting.model');
var WallpaperListingComponent = (function () {
    function WallpaperListingComponent(service) {
        this.service = service;
    }
    WallpaperListingComponent.prototype.ngOnInit = function () {
        this.wallpaperListing = new wallpaperlisting_model_1.WallpaperListing();
        this.loadWallpapers(null);
    };
    WallpaperListingComponent.prototype.open = function (url) {
        window.open(url, '_blank');
    };
    WallpaperListingComponent.prototype.loadWallpapers = function (after) {
        var _this = this;
        this.service
            .getWallpapers(after)
            .subscribe(function (result) {
            if (after === null) {
                _this.wallpaperListing = result;
            }
            else {
                _this.wallpaperListing.wallpapers = _this.wallpaperListing.wallpapers.concat(result.wallpapers);
                _this.wallpaperListing.after = result.after;
            }
        }, function (error) { return _this.error = true; });
    };
    WallpaperListingComponent.prototype.loadMore = function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.loadWallpapers(this.wallpaperListing.after);
        }
    };
    WallpaperListingComponent = __decorate([
        core_1.Component({
            selector: 'wallpaper-listing',
            template: require('./wallpaperlisting.component.html'),
            styles: [require('./wallpaperlisting.component.less').toString()],
            providers: [reddit_service_1.RedditService],
            directives: [angular2_infinite_scroll_1.InfiniteScroll]
        }), 
        __metadata('design:paramtypes', [reddit_service_1.RedditService])
    ], WallpaperListingComponent);
    return WallpaperListingComponent;
}());
exports.WallpaperListingComponent = WallpaperListingComponent;
