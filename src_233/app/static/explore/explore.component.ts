import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS, ROUTE_ANIMATIONS_PAGE } from '@app/core';
import { Feature, features } from './features.data';



@Component({
  selector: 'anms-features',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  routeAnimationsPage = ROUTE_ANIMATIONS_PAGE;
  features: Feature[] = features;

  ngOnInit() { }

  openLink(link: string) {
    window.open(link, '_blank');
  }
  /* 发表帖子按钮 */
  sendBtn() {

  }
}
