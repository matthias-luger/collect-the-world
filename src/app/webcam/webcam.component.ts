import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { PhotoStorageService } from '../photoStorage.service';
import { TargetPhotoService } from '../target-photo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-webcam',
  standalone: true,
  imports: [CommonModule, WebcamModule, RouterLink],
  templateUrl: './webcam.component.html',
  styleUrl: './webcam.component.css',
})
export class WebcamComponent {
  constructor(
    private photoStorageService: PhotoStorageService,
    private targetPhotoService: TargetPhotoService
  ) {}

  private trigger: Subject<void> = new Subject<void>();
  public targetPhoto: string = this.targetPhotoService.getNextTargetImage();

  public onSnapshotClick() {
    this.trigger.next();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.photoStorageService.addToIndexedDB({
      base64: webcamImage.imageAsDataUrl,
      target: this.targetPhoto,
    });
    this.targetPhoto = this.targetPhotoService.getNextTargetImage();
  }
}
