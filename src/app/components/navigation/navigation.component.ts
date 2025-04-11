import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  activeRoute = '';
  constructor(router: Router) {
    router.events.subscribe((url: any) => (this.activeRoute = url.url));
  }
}
