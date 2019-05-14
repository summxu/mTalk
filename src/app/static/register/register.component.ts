import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

@Component({
  selector: 'anms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  code = `/api/checkCode`;
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
    { text: '我这个吨位配有对象么' }
  ];
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
    nickname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repassword: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    checkCode: ['', [Validators.required]]
  });

  formValueChanges$: Observable<Form>;

  constructor(
    private fb: FormBuilder,
    // private store: Store<State>,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private mtalkHttpService: MtalkHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.formValueChanges$ = this.form.valueChanges.pipe(
    //   debounceTime(500),
    //   filter((form: Form) => form.autosave)
    // );
  }

  submit() {
    // if (this.form.get('password') != this.form.get('repassword')) {
    //   this.notificationService.error('两次密码不一致！')
    //   return false
    // }
    if (this.form.valid) {
      // this.save();
      this.mtalkHttpService.register(this.form.value).subscribe(
        value => {
          if (value.success === true) {
            this.notificationService.success('注册成功,请登录');
            this.refCode();
            this.router.navigateByUrl(`/login`);
          } else {
            this.notificationService.error(value.msg);
            this.refCode();
          }
        },
        error => {
          this.notificationService.error('注册失败,请检查网络连接');
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
