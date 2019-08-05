import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, tap } from 'rxjs/operators';
import { concat, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CheckForUpdateService {

  prompting = false;

  constructor(private appRef: ApplicationRef, private updates: SwUpdate) {
    console.log('CheckForUpdateService constructor');
    // updates.available.subscribe(event => {
    //   if (this.promptUser(event)) {
    //     updates.activateUpdate().then(() => document.location.reload());
    //   }
    // });

  }

  initUpdatePing() {
    console.log('initUpdatePing');
    const appIsStable$ = this.appRef.isStable.pipe(first(), tap(isStable => {
      console.log('App is stable');
      // this.initLog();
    }));

    const updatePeriod$ = interval(10 * 1000);
    const updatePeriodOnceAppIsStable$ = concat(appIsStable$, updatePeriod$);

    updatePeriodOnceAppIsStable$.subscribe(() => {
      console.log('checkForUpdate');
      this.updates.checkForUpdate().then(event => console.log(event)).catch(e => console.log(e));
    });
  }

  public init(): void {
    console.log('checkForUpdates init');
    this.initUpdatePing();
    this.updates.available.subscribe(event => this.promptUser(event));
  }

  private promptUser(event): boolean {
    console.log('New version of service available');
    if (this.prompting) {
      return;
    }
    this.prompting = true;
    alert('New version of service is available. We will update it in a moment');
    this.updates.activateUpdate().then(() => document.location.reload());
    this.prompting = false;
    return true;
  }

  initLog() {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

}


