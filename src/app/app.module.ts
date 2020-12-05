import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { FirebaseConfig } from '../environments/firebaseConfig';
import { RootStoreModule } from './root-store';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SharedModule } from './shared/shared-module/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    RootStoreModule,
    AppRoutingModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
