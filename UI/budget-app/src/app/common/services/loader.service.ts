import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  load$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  hideLoader(){
    this.load$.next(false);
  }
  showLoader(){
    this.load$.next(true);
  }
}
