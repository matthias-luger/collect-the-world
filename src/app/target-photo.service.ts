import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TargetPhotoService {
  private TARGETS = [
    'Stuhl',
    'Person',
    'Computer',
    'Flasche',
    'Tastatur',
    'Tasche',
    'Dose',
    'Tier',
  ];
  private currentTargetIndex = Math.round(
    Math.random() * (this.TARGETS.length - 1)
  );

  constructor() {}

  private getAndUpdateNextTargetIndex() {
    if (this.currentTargetIndex === this.TARGETS.length - 1) {
      this.currentTargetIndex = 0;
    } else {
      this.currentTargetIndex++;
    }
    return this.currentTargetIndex;
  }

  public getNextTargetImage() {
    return this.TARGETS[this.getAndUpdateNextTargetIndex()];
  }
}
