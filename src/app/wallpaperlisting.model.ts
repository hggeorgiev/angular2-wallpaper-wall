/**
 * Created by hgeorgiev on 8/8/16.
 */
import { Wallpaper } from './wallpaper.model';//Don't forget import the Wallpaper model

export class WallpaperListing {
    wallpapers: Array<Wallpaper>;//array of wallpapers
    after: string;
}