import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { QuillModule } from 'ngx-quill'
import { MatAutocompleteModule } from '@angular/material';
import { StaticRoutingModule } from './static-routing.module';

import { LoginComponent } from './login/login.component';
import { ExploreComponent } from './explore/explore.component';
import { SendpostComponent } from './sendpost/sendpost.component';
import { DetailpostComponent } from './detailpost/detailpost.component';
import { RegisterComponent } from './register/register.component';
import { PersonComponent } from './person/person.component';

@NgModule({
  imports: [
    SharedModule,
    StaticRoutingModule,
    MatAutocompleteModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }],
          ['link', 'image', 'video']                         // link and image, video
        ]
      }
    })
  ],
  declarations: [
    LoginComponent,
    ExploreComponent,
    SendpostComponent,
    DetailpostComponent,
    RegisterComponent,
    PersonComponent
  ]
})
export class StaticModule { }
