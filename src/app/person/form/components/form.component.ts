import { MtalkHttpService } from './../../../core/mtalk-http/mtalk-http.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { filter, debounceTime, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '@app/core';

import { State } from '../../examples.state';
import { ActionFormUpdate, ActionFormReset } from '../form.actions';
import { selectFormState } from '../form.selectors';
import { Form } from '../form.model';

@Component({
  selector: 'anms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  siteId: string;

  form = this.fb.group({
    open: false,
    sendposts: false,
    isreg: false,
    login: false,
    chat: false,
    talks: ['', [Validators.required]]
  });

  formValueChanges$: Observable<Form>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private mtalkHttp: MtalkHttpService
  ) { }

  ngOnInit() {
    /* 检测站点状态 */
    this.mtalkHttp.getSite().subscribe(value => {
      console.log(value)
      this.siteId = value.data[0]._id
      let form = {
        open: value.data[0].open,
        sendposts: value.data[0].sendposts,
        isreg: value.data[0].isreg,
        login: value.data[0].login,
        chat: value.data[0].chat,
        talks: value.data[0].talks
      }
      console.log(form)
      this.form.setValue(form)
    })
  }

  submit() {
    if (this.form.valid) {
      let data = this.form.value
      data._id = this.siteId
      this.mtalkHttp.updateSite(data).subscribe(value => {
        this.notificationService.success('站点信息更新成功！')
      })
    }
  }
}
