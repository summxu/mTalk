import { AvatarPipePipe } from '@app/core/pipe/avatar-pipe.pipe';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { QuillModule } from 'ngx-quill';
import { MatAutocompleteModule } from '@angular/material';
import { StaticRoutingModule } from './static-routing.module';

import { LoginComponent } from './login/login.component';
import { ExploreComponent } from './explore/explore.component';
import { SendpostComponent } from './sendpost/sendpost.component';
import { DetailpostComponent } from './detailpost/detailpost.component';
import { RegisterComponent } from './register/register.component';

import { ChatModule } from './chat/chat.module';
import { SharedAModule } from './shared/shared.module';
import { DialogUserComponent } from './chat/dialog-user/dialog-user.component';
import { MatDialogModule } from '@angular/material';
import { DialogSearchComponent } from './explore/search-dialog/dialog-user.component';

@NgModule({
  imports: [
    MatDialogModule,
    SharedModule,
    SharedAModule,
    StaticRoutingModule,
    ChatModule,
    MatAutocompleteModule,
    QuillModule.forRoot({
      modules: {
        // syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],
          ['link', 'image', 'video'] // link and image, video
        ]
      }
    })
  ],
  declarations: [
    LoginComponent,
    DialogSearchComponent,
    ExploreComponent,
    SendpostComponent,
    DetailpostComponent,
    RegisterComponent,
    AvatarPipePipe
  ],
  entryComponents: [DialogUserComponent, DialogSearchComponent]
})
export class StaticModule {}
