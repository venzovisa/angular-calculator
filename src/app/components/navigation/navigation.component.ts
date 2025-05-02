import { Component } from '@angular/core';
import { Router, RouterModule, Event } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  activeRoute = '';
  constructor(router: Router) {
    router.events.subscribe((event: Event) => {
      if ('url' in event) this.activeRoute = event.url;
    });
  }
}
