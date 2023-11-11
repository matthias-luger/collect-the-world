import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PhotoStorageService } from '../photoStorage.service';
import { RouterLink } from '@angular/router';
import { Photo } from '../photo';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  public images: Photo[] = [];

  constructor(private photoStorageService: PhotoStorageService) {}

  ngOnInit() {
    this.loadImages();
  }

  private async loadImages() {
    this.images = await this.photoStorageService.getAllStringsFromIndexedDB();
  }

  public deleteAll() {
    this.photoStorageService.deleteAllPhotos();
    this.loadImages();
  }
}
