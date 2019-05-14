import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ExploreComponent } from './explore/explore.component';
import { SendpostComponent } from './sendpost/sendpost.component';
import { DetailpostComponent } from './detailpost/detailpost.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'anms.login.login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'anms.register.register' }
  },
  {
    path: 'explore',
    component: ExploreComponent,
    data: { title: 'anms.menu.features' }
  },
  {
    path: 'sendpost',
    component: SendpostComponent,
    data: { title: 'anms.menu.sendpost' }
  },
  {
    path: 'detailpost',
    component: DetailpostComponent,
    data: { title: 'anms.menu.detailpost' }
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: 'anms.menu.detailpost' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
