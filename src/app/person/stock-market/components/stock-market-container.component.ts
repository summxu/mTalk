import { MtalkHttpService } from '@app/core/mtalk-http/mtalk-http.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { NotificationService } from '@app/core';

@Component({
  selector: 'anms-stock-market',
  templateUrl: './stock-market-container.component.html',
  styleUrls: ['./stock-market-container.component.scss']
})
export class StockMarketContainerComponent implements OnInit {
  users = [];

  constructor(
    private mTalkHttpService: MtalkHttpService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  /* q请求用户 */
  getUsers() {
    this.mTalkHttpService.getUsers().subscribe(value => {
      this.users = value.data;
    });
  }

  /* shanchu */
  dongjie(id, authority) {
    var formValue = {
      id: id,
      authority: authority == 'true' ? 'false' : 'true',
      accessToken: ''
    };
    formValue.accessToken = this.localStorageService.getItem(
      'userInfo'
    ).accessToken;

    this.mTalkHttpService.updateById(formValue).subscribe(value => {
      console.log(value);
      if (value.success) {
        this.users.forEach(item => {
          if (item._id == id) {
            item.authority = item.authority == 'true' ? 'false' : 'true';
          }
          if (authority == 'true') {
            this.notificationService.success('用户解冻！');
          } else {
            this.notificationService.error('用户被冻结！');
          }
        });
      } else {
        this.notificationService.error(value.msg);
      }
    });
  }
  /* dongjie  */
  deluser(id) {
    this.mTalkHttpService.delUser({ _id: id }).subscribe(value => {
      if (value.success) {
        this.users.splice(this.users.findIndex(v => v._id == id), 1);
        this.notificationService.success('删除用户成功！');
      }
    });
  }
}
