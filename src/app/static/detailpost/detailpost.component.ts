import { LocalStorageService } from './../../core/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MtalkHttpService } from '@app/core/mtalk-http/mtalk-http.service';
import { NotificationService } from '@app/core/notifications/notification.service';

@Component({
  selector: 'anms-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.scss']
})
export class DetailpostComponent implements OnInit {
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  commits: any[] = [];

  private postInfo: Object;
  private postId: string;

  form = this.fb.group({
    theme: ['', [Validators.required]]
  });

  constructor(
    private routeInfo: ActivatedRoute,
    private mtalkHttpService: MtalkHttpService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    /* 获取路由id */
    this.postId = this.routeInfo.snapshot.queryParams['id'];
    this.mtalkHttpService.getPostDetail({ id: this.postId }).subscribe(
      value => {
        if (value.success === true) {
          this.postInfo = value.data;
          console.log(this.postInfo);
        } else {
          this.notificationService.error('请求失败,未知原因');
        }
      },
      error => {
        this.notificationService.error('请求失败,请检查网络连接');
      }
    );
    /* 获取评论 */
    this.getCommits();
  }

  /* 发表评论 */
  submit() {
    if (this.localStorage.getItem('userInfo') == null) {
      this.notificationService.error('用户未登录，请登陆后重试');
      this.router.navigateByUrl(`/login`);
      return false;
    }
    /* 验证通过之后 */
    if (this.form.valid) {
      this.form.value.accessToken = this.localStorageService.getItem(
        'userInfo'
      ).accessToken;
      this.form.value.aspost = this.postId;
      this.mtalkHttpService.sendCommit(this.form.value).subscribe(
        value => {
          if (value.success === true) {
            this.notificationService.success('评论成功');
            this.commits.push(value.data);
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
  /* 获取评论 */
  getCommits() {
    this.mtalkHttpService.getCommit({ aspost: this.postId }).subscribe(
      value => {
        if (value.success === true) {
          this.commits = value.data;
          /* 查找是否点过站 */
          this.commits.forEach(item => {
            item.userstarts.forEach(element => {
              if (
                element._id == this.localStorageService.getItem('userInfo')._id
              ) {
                item.isstart = true;
              } else {
                item.isstart = true;
              }
            });
            console.log(item);
          });
        } else {
          this.notificationService.error(value.msg);
        }
      },
      error => {
        this.notificationService.error('请求失败,请检查网络连接');
      }
    );
  }

  /* 点赞 */
  start(id) {
    for (let index = 0; index < this.commits.length; index++) {
      const element = this.commits[index];
      if (element._id == id) {
        if (element.isstart) {
          this.notificationService.error('你已经点过赞了！');
          element.isstart = true;
          return false;
        }
      }
    }
    this.mtalkHttpService.start({ commit_id: id }).subscribe(
      value => {
        if (value.success === true) {
          this.commits.forEach(item => {
            if (item._id == id) {
              item.starts += 1;
            }
          });
        }
      },
      error => {
        this.notificationService.error('请求失败,请检查网络连接');
      }
    );
  }
}
