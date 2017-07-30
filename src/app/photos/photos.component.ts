import { Component } from '@angular/core';
import { PhotosService } from './photos.service';
import { DomSanitizer } from '@angular/platform-browser';

//import * as _ from "lodash";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  providers: [PhotosService]
})

export class PhotosComponent {
  constructor(private photosService: PhotosService, private _sanitizer: DomSanitizer) { 
    PhotosComponent.successCount = 8;
    this.beginGame();
  }

  self = this;
  photosList = this.photosService.getPhotos();
  static successCount: number = 8;
  isfirstPhotoChosen: boolean = false;
  firstPhoto: any;
  //photosListCopy = _.clone(this.photosList);
  
  flipPhotos() {
    console.log('Photos Are Flipped');
  }

  beginGame() {
    setTimeout( ()=>{
      this.flipPhotos()
    }, 5000);
  }

  choosePhoto(photoItem) {
    photoItem.className += " hover";

    setTimeout(function() {
      // Choose First Photo 
      if(!this.isfirstPhotoChosen) {
        this.isfirstPhotoChosen = true;
        this.firstPhoto = photoItem;
      }

      // Choose Second Photo
      else {
        this.isfirstPhotoChosen = false;
        console.log('first photo: ', this.firstPhoto.id, 'second photo: ', photoItem.id)
        
        // Two photos match
        if(this.firstPhoto.id === photoItem.id) {
          PhotosComponent.successCount = PhotosComponent.successCount-1;
          console.log(PhotosComponent.successCount);
          if(PhotosComponent.successCount <= 0) {
            alert("You Win");
          }
        }
        // Two photos do not match
        else {
          this.firstPhoto.className = "flipper";
          photoItem.className = "flipper";
        }

      }
    }, 1000)
    
  }

  getBackground (id, secret, farm, server) { 
    let image: string =  'https://farm'+ farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient( rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
}