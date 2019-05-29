import { InfoComponent } from './info/info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { ExamplesComponent } from './examples/examples.component';
import { ParentComponent } from './theming/parent/parent.component';
import { StockMarketContainerComponent } from './stock-market/components/stock-market-container.component';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { SettingsContainerComponent } from '../settings';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'stock-market',
        component: StockMarketContainerComponent,
        data: { title: 'anms.examples.menu.stocks' }
      },
      {
        path: 'theming',
        component: ParentComponent,
        data: { title: 'anms.examples.menu.theming' }
      },
      {
        path: 'settings',
        component: SettingsContainerComponent,
        data: { title: 'anms.examples.menu.settings' }
      },
      {
        path: 'form',
        component: FormComponent,
        data: { title: 'anms.examples.menu.site' }
      },
      {
        path: 'info',
        component: InfoComponent,
        data: { title: 'anms.person.menu.info' }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'anms.examples.menu.notifications' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
