import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  LocalStorageService,
  NotificationService
} from '@app/core';
import { MtalkHttpService } from '@app/core/mtalk-http/mtalk-http.service';

@Component({
  selector: 'anms-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  themeSrc: string = require('!raw-loader!./parent.component.scss-theme.scss');
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  posts = [];
  constructor(
    private mTalkHttpService: MtalkHttpService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  /* q请求用户 */
  getPosts() {
    this.mTalkHttpService.getPosts().subscribe(value => {
      this.posts = value;
    });
  }

  /* dongjie  */
  delPost(id) {
    this.mTalkHttpService.delPost({ _id: id }).subscribe(value => {
      if (value.success) {
        this.posts.splice(this.posts.findIndex(v => v._id == id), 1);
        this.notificationService.success('删除帖子成功！');
      }
    });
  }
}
