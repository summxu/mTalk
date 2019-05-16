import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { selectIsAuthenticated, ActionAuthLogin, AppState } from '@app/core';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService,
  ROUTE_ANIMATIONS_PAGE
} from '@app/core';
// import { State } from '../../examples.state';
import { ActionFormUpdate, ActionFormReset } from '../form.actions';
import { selectFormState } from '../form.selectors';
import { Form } from './form.model';
import { MtalkHttpService } from '@app/core/mtalk-http/mtalk-http.service';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  code = `/api/checkCode`;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  routeAnimationsPage = ROUTE_ANIMATIONS_PAGE;
  /* tag控制 */
  myTags = [];
  tagState = false;
  islogin = false;
  tagOption = {
    dragControl: false,
    weight: true,
    activeCursor: 'activeCursor',
    initial: [-0.008, 0.008],
    shadow: '#000000',
    shuffleTags: true,
    wheelZoom: false,
    outlineMethod: 'none',
    zoom: 1.5,
    noMouse: true
  };

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    checkCode: ['', [Validators.required]],
    remember: true
  });

  formValueChanges$: Observable<Form>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private localStorage: LocalStorageService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private mtalkHttpService: MtalkHttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mtalkHttpService.getSite().subscribe(value => {
      this.myTags = JSON.parse(value.data[0].talks)
      this.islogin = value.data[0].login
      console.log(this.myTags)
      setInterval(time => {
        this.tagState = true
      }, 0)
    })
  }

  submit() {
    /* 判断是否允许登陆 */
    if (this.islogin) {
      this.notificationService.error('本站点禁止登陆！')
      return false
    }

    /* 验证通过之后 */
    if (this.form.valid) {
      this.mtalkHttpService.login(this.form.value).subscribe(
        value => {
          if (value.success === true) {
            this.notificationService.success('登录成功');
            this.refCode();
            this.localStorage.setItem('userInfo', value.userinfo);
            console.log(this.localStorage.getItem('userInfo'));
            this.router.navigateByUrl(`/explore`);
            this.store.dispatch(new ActionAuthLogin());
          } else {
            this.notificationService.error(value.msg);
            this.refCode();
          }
        },
        error => {
          this.notificationService.error('登录失败,请检查网络连接');
          this.refCode();
        }
      );
    }
  }

  reset() {
    this.form.reset();
    this.form.clearValidators();
    this.form.clearAsyncValidators();
    // this.store.dispatch(new ActionFormReset());
  }

  /* 刷新验证码 */
  refCode() {
    this.code = `/api/checkCode?` + Math.random();
  }
}
