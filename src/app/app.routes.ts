import { Routes } from '@angular/router';
import { WebcamComponent } from './webcam/webcam.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
  {
    path: 'cam',
    component: WebcamComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: '**',
    redirectTo: '/cam',
  },
];
