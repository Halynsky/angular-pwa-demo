import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, tap } from 'rxjs/operators';
import { concat, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SwuService {

  prompting = false;

  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate) {
    console.log('SwuService constructor');
  }

  initUpdatePing() {
    console.log('initUpdatePing');
    // const appIsStable$ = this.appRef.isStable.pipe(first(), tap(isStable => {
    //   console.log('App is stable');
    // }));
    //
    // const updatePeriod$ = interval(10 * 1000);
    //
    // updatePeriod$.subscribe(event => {
    //   console.log('Interval');
    //   // this.swUpdate.checkForUpdate();
    // });

    // const updatePeriodOnceAppIsStable$ = concat(appIsStable$, updatePeriod$);
    //
    // updatePeriodOnceAppIsStable$.subscribe(() => {
    //   console.log('checkForUpdate');
    //   this.swUpdate.checkForUpdate().then(event => console.log('event', event)).catch(e => console.error('error', e));
    // });

    // const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    // const everySixHours$ = interval(10 * 1000);
    // const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    //
    // everySixHoursOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());

  }

  public init(): void {
    console.log('SwuService init');
    this.initCheck();
    this.initUpdatePing();
  }

  private promptUser(event): boolean {
    console.log('Prompting user about new version');
    if (this.prompting) {
      return;
    }
    this.prompting = true;
    alert('New version of service is available. We will update it in a moment');
    this.swUpdate.activateUpdate().then(() => document.location.reload());
    this.prompting = false;
    return true;
  }

  initCheck() {
    this.swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      this.promptUser(event);
    });
    this.swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

}


