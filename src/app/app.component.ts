import { Component } from '@angular/core';
import {WallpaperListingComponent} from './wallpaperlisting.component' //importing the component
@Component({
    selector: 'app',
    template: '<wallpaper-listing></wallpaper-listing>',
    styles: [require('./app.component.less').toString()],
    directives: [ WallpaperListingComponent ]
})
export class AppComponent {
    constructor() { }

}