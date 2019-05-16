import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { routeAnimations, selectAuth, LocalStorageService } from '@app/core';
import { State as BaseSettingsState } from '@app/settings';

import { State as BaseExamplesState } from '../examples.state';

interface State extends BaseSettingsState, BaseExamplesState { }

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations]
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  isAdmin = false;
  examples = [
    { link: 'info', label: 'anms.person.menu.info' },
    { link: 'settings', label: 'anms.examples.menu.settings' },
    { link: 'stock-market', label: 'anms.examples.menu.stocks', auth: true },
    { link: 'theming', label: 'anms.examples.menu.theming', auth: true },
    { link: 'form', label: 'anms.examples.menu.site', auth: true }
  ];

  constructor(
    private store: Store<State>,
    private local: LocalStorageService
  ) { }

  ngOnInit(): void {
    if (this.local.getItem('userInfo').role) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
