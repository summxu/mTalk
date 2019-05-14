import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService, ROUTE_ANIMATIONS_PAGE } from '@app/core';
// import { State } from '../../examples.state';
import { ActionFormUpdate, ActionFormReset } from '../form.actions';
import { selectFormState } from '../form.selectors';
import { Form } from './form.model';

@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  routeAnimationsPage = ROUTE_ANIMATIONS_PAGE;
  /* tag控制 */
  myTags = [
    { text: '语言和文字的起源！' },
    { text: '你吃饭了吗？' },
    { text: '中国男生找不到对象看来不是没有原因的' },
    { text: '是因为夏天来了吗' },
    { text: '说三个字 打动我了当你女朋友！' },
    { text: '灵魂早万里挑一 就怕没得挑。' },
    { text: '大家好我是来钓鱼的有自己上钩的吗？' },
    { text: '许多年以前看过，有资源的发一个？' },
    { text: '老哥们，闲鱼上这些人你们怎么看' },
    { text: '90后无矿自己创业经历，一起见证' },
    { text: '舔狗是没有好结果的' },
    { text: '这？？？怎么感觉跟微商似的' },
    { text: '我这个吨位配有对象么' },
  ]
  tagOption = {
    dragControl: false,
    weight: true,
    activeCursor: 'activeCursor',
    initial: [-0.008, 0.008],
    shadow: "#000000",
    shuffleTags: true,
    wheelZoom: false,
    outlineMethod: 'none',
    zoom: 1.5,
    noMouse: true
  }

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    checkCode: ['', [Validators.required]],
    remember: false
  });

  formValueChanges$: Observable<Form>;

  constructor(
    private fb: FormBuilder,
    // private store: Store<State>,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.formValueChanges$ = this.form.valueChanges.pipe(
      debounceTime(500),
      filter((form: Form) => form.autosave)
    );
    /* this.store
      .pipe(
        select(selectFormState),
        take(1)
      )
      .subscribe(form => this.form.patchValue(form.form)); */
  }

  /* update(form: Form) {
    this.store.dispatch(new ActionFormUpdate({ form }));
  }

  save() {
    this.store.dispatch(new ActionFormUpdate({ form: this.form.value }));
  } */

  submit() {
    /* 验证通过之后 */
    if (this.form.valid) {
      this.notificationService.error(
        '登陆失败,用户名或密码错误'
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

}
