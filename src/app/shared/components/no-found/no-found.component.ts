import {Component, inject} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-no-found',
  imports: [],
  templateUrl: './no-found.component.html',
  styles: ``
})
export class NoFoundComponent {

  location = inject(Location);

  goBack() {
    this.location.back();
  }

}
