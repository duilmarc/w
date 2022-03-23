import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GiftsComponent } from './gifts/gifts.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddGiftComponent } from './gifts/add-gift/add-gift.component';
import { GiftListComponent } from './gifts/gift-list/gift-list.component';
import { GiftItemComponent } from './gifts/gift-item/gift-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    GiftsComponent,
    LoginComponent,
    SignupComponent,
    AddGiftComponent,
    GiftListComponent,
    GiftItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
