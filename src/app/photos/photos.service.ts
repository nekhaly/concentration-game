import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as _ from "lodash";

@Injectable()
export class PhotosService {
    public photos_for: string = 'kitten';
    public photos_level: number = 16;

    private photos_count : number = this.photos_level/2;
    private random_page : number = Math.abs(Math.random()*50);
    private api_key: string = '9e941eb6949db0bfdb3ac49202c76dda';
    private baseUrl: string = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + this.api_key + '&tags=' + this.photos_for + '&per_page=' + this.photos_count + '&page=' + this.random_page + '&format=json&nojsoncallback=1';
    
    constructor(private http: Http) {}
    
    getPhotos() {
        let photos = this.http.get(this.baseUrl).map(response => _.shuffle(response.json().photos.photo.concat(response.json().photos.photo)));      
        return photos; 
    }

}