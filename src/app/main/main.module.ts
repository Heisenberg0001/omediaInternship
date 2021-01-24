import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {UserPageComponent} from './user-page/user-page.component';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './user-page/main-routing.module';
import {LandingPageComponent} from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    FooterComponent,
    HeaderComponent,
    UserPageComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule
  ]
})

export class MainModule { }
