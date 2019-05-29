import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated
} from '@app/core';

import { environment as env } from '@env/environment';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './settings';

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  userInfo = { nickname: 'mtalk' };
  // userInfo = this.localStorage.getItem('userInfo')
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['cn', 'en'];
  navigation = [
    { link: 'chat', label: 'anms.menu.chat' },
    { link: 'explore', label: 'anms.menu.features' }
  ];
  navigationSideMenu = [
    ...this.navigation
  ];

  /* sessionstorage 鉴权 */
  isAuthenticated: false;
  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
    private localStorage: LocalStorageService,
    private store: Store<AppState>
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.userInfo = this.localStorage.getItem('userInfo');
    if (this.userInfo) this.isAuthenticated;

    /* 订阅登陆状态改变 */
    this.store.pipe(select(selectIsAuthenticated)).subscribe(value => {
      this.userInfo = this.localStorage.getItem('userInfo');
    });

    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
    /* 清除store */
    this.localStorage.removeItem('userInfo');
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }
}
