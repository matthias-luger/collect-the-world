import { Injectable } from '@angular/core';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoStorageService {
  constructor() {}

  private databaseName = 'photoDB';
  private storeName = 'photos';

  public addToIndexedDB(photo: Photo) {
    var request = indexedDB.open(this.databaseName, 1);

    request.onerror = function (error) {
      alert('Database error');
      console.error('Database error: ', error);
    };

    request.onupgradeneeded = event => {
      var db = (event as any).target.result as IDBDatabase;

      // Create an object store with auto-incrementing key
      var objectStore = db.createObjectStore(this.storeName, {
        keyPath: 'id',
        autoIncrement: true,
      });
    };

    // This event is fired once the database is opened successfully
    request.onsuccess = event => {
      var db = (event as any).target.result as IDBDatabase;

      // Start a new transaction
      var transaction = db.transaction([this.storeName], 'readwrite');

      // Get the object store
      var objectStore = transaction.objectStore(this.storeName);

      // Add the inputString to the object store
      var addRequest = objectStore.add({ data: JSON.stringify(photo) });

      // This event is fired when an error occurs during the add request
      addRequest.onerror = function (error) {
        alert('Error adding data');
        console.error('Error adding data: ', error);
      };

      // Close the transaction and the database
      transaction.oncomplete = function () {
        db.close();
      };
    };
  }

  public getAllStringsFromIndexedDB(): Promise<Photo[]> {
    return new Promise((resolve, reject) => {
      var request = indexedDB.open(this.databaseName, 1);

      request.onerror = function (error) {
        alert('Database error');
        console.error('Database error: ', error);
        reject(error);
      };

      request.onsuccess = event => {
        var db = (event as any).target.result as IDBDatabase;
        var transaction = db.transaction([this.storeName], 'readonly');
        var objectStore = transaction.objectStore(this.storeName);

        var getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function (event) {
          var results = (event as any).target.result as any[];

          let photos = results.map(entry => JSON.parse(entry.data));

          console.log(photos);

          db.close();

          resolve(photos as Photo[]);
        };

        getAllRequest.onerror = function (error) {
          alert('Error getting data');
          console.error('Error getting data: ', error);
          db.close();
          reject(error);
        };
      };
    });
  }

  public deleteAllPhotos(): Promise<void> {
    return new Promise((resolve, reject) => {
      var request = indexedDB.open(this.databaseName, 1);

      request.onsuccess = event => {
        var db = (event as any).target.result as IDBDatabase;
        var transaction = db.transaction([this.storeName], 'readwrite');
        var objectStore = transaction.objectStore(this.storeName);

        var clearRequest = objectStore.clear();

        clearRequest.onsuccess = function () {
          db.close();
          resolve();
        };

        clearRequest.onerror = function (event: any) {
          alert('Error clearing db');
          console.error(
            'Error clearing object store: ' + event.target.errorCode
          );
          db.close();
          reject();
        };
      };
    });
  }
}
