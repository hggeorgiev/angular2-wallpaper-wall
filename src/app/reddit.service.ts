/**
 * Created by hgeorgiev on 8/8/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';//using the RxJS observables
import { Wallpaper } from './wallpaper.model'; //improting the wallpaper model
import { WallpaperListing } from './wallpaperlisting.model';//importing the wallpaper listing model

@Injectable()
export class RedditService {

    constructor(private http:Http) {

    }


    getWallpapers(after:string):Observable<WallpaperListing> {
        let path = '//www.reddit.com/r/wallpapers.json?raw_json=1';

        // continues from last item loaded
        if (after) path += '&after=' + after;

        return this.http
            .get(path)
            .map(this.mapWallpapers);
    }

    mapWallpapers(res:Response) {
        let body = res.json();
        let listing = new WallpaperListing();

        //iterate through the data
        let wallpapers = new Array<Wallpaper>();

        body.data.children.forEach(post => {
            if (post.data.post_hint === 'image') {
                let item = new Wallpaper();

                item.url = post.data.url;
                item.title = post.data.title;

                let previewImages = post.data.preview.images;
                let resolutions = post.data.preview.images[0].resolutions;

                let previewImage = resolutions.filter(m => m.width === 960)[0];

                item.previewUrl = previewImage ? previewImage.url : item.url;

                wallpapers.push(item);
            }
        });

            listing.wallpapers = wallpapers;
            listing.after = body.data.after;

            return listing;
    }
}