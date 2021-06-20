import { NgModule } from '@angular/core';
import { UserPageComponent } from './components/user-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserPageRouterModule } from './user-page-router.module';

@NgModule({
  declarations: [ UserPageComponent ],
  imports: [
    CommonModule,
    FormsModule,
    UserPageRouterModule
  ],
  bootstrap: [ UserPageComponent ]
})

export class UserPageModule {}
