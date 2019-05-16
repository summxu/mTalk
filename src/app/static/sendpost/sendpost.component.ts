import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ROUTE_ANIMATIONS_ELEMENTS, ROUTE_ANIMATIONS_PAGE } from '@app/core';
import { MtalkHttpService } from '../../core/mtalk-http/mtalk-http.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectIsAuthenticated, ActionAuthLogin, AppState } from '@app/core';

@Component({
  selector: 'anms-sendpost',
  templateUrl: './sendpost.component.html',
  styleUrls: ['./sendpost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendpostComponent implements OnInit {
  /* 标签列表 */
  tags = [];
  tag: string;
  options: string[] = ['One', 'Two', 'Three'];

  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  routeAnimationsPage = ROUTE_ANIMATIONS_PAGE;
  theme = '';
  form = this.fb.group({
    title: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private mtalkHttpService: MtalkHttpService,
    private notificationService: NotificationService,
    private localStorage: LocalStorageService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    /* 获取草稿箱 */
    if (this.localStorage.getItem('userInfo')) {
      this.form.setValue({
        title: JSON.parse(this.localStorage.getItem('userInfo').draft).title
      });
      this.theme = JSON.parse(
        this.localStorage.getItem('userInfo').draft
      ).theme;
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  /* 保存草稿 */
  saveDraft() {
    /* 检测站点聊天状态 */
    this.mtalkHttpService.getSite().subscribe(value => {
      if (value.data[0].sendposts) {
        this.notificationService.error('本站点禁止发帖！')
      }
    })
    /* 验证通过之后 */
    if (this.theme == '' || this.form.value.title == '') {
      this.notificationService.error('主题内容和标题不能为空');
      return false;
    }
    if (this.localStorage.getItem('userInfo') == null) {
      this.notificationService.error('用户未登录，请登陆后重试');
      this.router.navigateByUrl(`/login`);
      return false;
    }

    if (this.form.valid) {
      var data = {
        accessToken: this.localStorage.getItem('userInfo').accessToken,
        draft: JSON.stringify({
          title: this.form.value.title,
          theme: this.theme
        })
      };
      this.mtalkHttpService.updateUser(data).subscribe(value => {
        this.localStorage.setItem('userInfo', value.data);
        this.notificationService.success('保存草稿成功！');
      });
    }
  }

  submit() {
    /* 验证通过之后 */
    if (this.theme == '' || this.form.value.title == '') {
      this.notificationService.error('主题内容和标题不能为空');
      return false;
    }
    if (this.localStorage.getItem('userInfo') == null) {
      this.notificationService.error('用户未登录，请登陆后重试');
      this.router.navigateByUrl(`/login`);
      return false;
    }
    if (this.form.valid) {
      var data = {
        title: this.form.value.title,
        accessToken: this.localStorage.getItem('userInfo').accessToken,
        theme: this.theme,
        tags: JSON.stringify(this.tags)
      };
      this.mtalkHttpService.sendpost(data).subscribe(
        value => {
          if (value.success === true) {
            this.notificationService.success('发帖成功');
            this.router.navigateByUrl(`/explore`);
          } else {
            this.notificationService.error(value.msg);
          }
        },
        error => {
          this.notificationService.error('请求失败,请检查网络连接');
        }
      );
    }
  }

  addTags() {
    if (this.tag == undefined || this.tag == '') {
      return false
    }
    for (let index = 0; index < this.tags.length; index++) {
      const element = this.tags[index];
      if (this.tag == element) return false

    }
    this.tags.push(this.tag)
    this.tag = ''
  }
}
