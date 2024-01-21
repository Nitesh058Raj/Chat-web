import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatWebComponent } from './chat-web.component';

const routes: Routes = [
  {
    path: '',
    component: ChatWebComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatWebRoutingModule {}
