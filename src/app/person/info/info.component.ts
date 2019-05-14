import { MtalkHttpService } from '@app/core/mtalk-http/mtalk-http.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService,
  LocalStorageService
} from '@app/core';

import { ActionFormUpdate, ActionFormReset } from '../form.actions';
import { selectFormState } from '../form.selectors';

@Component({
  selector: 'anms-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  photo = '/avatar/avatar (105).jpg';

  formInfo = this.fb.group({
    username: ['', [Validators.required]],
    nickname: ['', [Validators.required]],
    intro: ['', [Validators.required]],
    email: ['', [Validators.required]],
    createAt: ['', [Validators.required]]
  });

  formPass = this.fb.group({
    oldpass: ['', [Validators.required]],
    password: ['', [Validators.required]],
    repass: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private mTalkHttpService: MtalkHttpService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    // console.log(this.localStorageService.getItem('userInfo'));
    this.photo = this.localStorageService.getItem('userInfo').avatar;
    const createDate = this.localStorageService.getItem('userInfo').meta
      .createAt as Date;
    this.formInfo.setValue({
      username: this.localStorageService.getItem('userInfo').username,
      nickname: this.localStorageService.getItem('userInfo').nickname,
      intro: this.localStorageService.getItem('userInfo').intro,
      email: this.localStorageService.getItem('userInfo').email,
      createAt: createDate
    });
  }

  updateUser() {
    if (this.formInfo.valid) {
      var formValue = this.formInfo.value;
      formValue.accessToken = this.localStorageService.getItem(
        'userInfo'
      ).accessToken;
      this.mTalkHttpService.updateUser(formValue).subscribe(value => {
        console.log(value);
        if (value.success) {
          this.localStorageService.setItem('userInfo', value.data);
          this.notificationService.success('修改成功');
        } else {
          this.notificationService.success(value.msg);
        }
      });
    }
  }

  updatePass() {
    var oldPass = this.localStorageService.getItem('userInfo').password;
    var newOldPass = this.formPass.get('oldpass').value;
    var newPassword = this.formPass.get('password').value;
    var repass = this.formPass.get('repass').value;
    if (oldPass != newOldPass) {
      this.notificationService.error('原密码不正确');
    } else if (newPassword != repass) {
      this.notificationService.error('两次密码不一致');
    } else if (
      this.formPass.valid &&
      oldPass == newOldPass &&
      newPassword == repass
    ) {
      var formValue = this.formPass.value;
      formValue.accessToken = this.localStorageService.getItem(
        'userInfo'
      ).accessToken;
      this.mTalkHttpService.updateUser(formValue).subscribe(value => {
        console.log(value);
        if (value.success) {
          this.localStorageService.setItem('userInfo', value.data);
          this.notificationService.success('修改成功');
        } else {
          this.notificationService.success(value.msg);
        }
      });
    }
  }
}
