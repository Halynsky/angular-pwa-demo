import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { CheckForUpdateService } from '../сheck-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pwa-demo';

  constructor(private swUpdate: SwUpdate, private checkForUpdateService: CheckForUpdateService) {
    // this.checkSwUpdate();
    checkForUpdateService.init();
  }

  checkSwUpdate() {
    this.swUpdate.available.subscribe(event => {
      console.log('constructor');
      alert('New version is available. We will update our service in a moment');
      window.location.reload();
    });
  }

}
