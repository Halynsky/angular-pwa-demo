import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { CheckForUpdateService } from '../сheck-for-update.service';
import { SwuService } from '../swu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa-demo';

  constructor(private swUpdate: SwUpdate, private checkForUpdateService: CheckForUpdateService, private swuService: SwuService) {
    // this.checkSwUpdate();
    // checkForUpdateService.init();
    swuService.init();
  }

  checkSwUpdate() {
    this.swUpdate.available.subscribe(event => {
      console.log('constructor');
      alert('New version of service is available. We will update it in a moment');
      window.location.reload();
    });
  }

}
