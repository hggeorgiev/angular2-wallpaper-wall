/**
 * Created by hgeorgiev on 8/8/16.
 */
import { Component, OnInit } from '@angular/core';
import { RedditService } from './reddit.service';
import { InfiniteScroll } from 'angular2-infinite-scroll';
import { WallpaperListing } from './wallpaperlisting.model';


@Component({
    selector: 'wallpaper-listing',
    template: require('./wallpaperlisting.component.html'),
    styles: [require('./wallpaperlisting.component.less').toString()],
    providers: [RedditService],
    directives: [InfiniteScroll]
})

export class WallpaperListingComponent implements OnInit  {

    private wallpaperListing: WallpaperListing;
    private error: boolean;

    constructor(private service: RedditService) { }

    ngOnInit() {
        this.wallpaperListing = new WallpaperListing();
        this.loadWallpapers(null);
    }

    open(url:string) {
        window.open(url,'_blank');
    }

    loadWallpapers(after:string) {
        this.service
            .getWallpapers(after)
            .subscribe(result => {

                    if(after === null) {
                        this.wallpaperListing = result;
                    } else {
                        this.wallpaperListing.wallpapers = this.wallpaperListing.wallpapers.concat(result.wallpapers);
                        this.wallpaperListing.after = result.after;
                    }

                }, error => this.error = true
            );
    }


    loadMore() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.loadWallpapers(this.wallpaperListing.after);
        }
    }





}




