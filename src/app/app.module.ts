import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { AngularFireModule } from '@angular/fire';
import { FirebaseConfig } from '../environments/firebaseConfig';
import { RootStoreModule } from './root-store';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    MatSliderModule,
    RootStoreModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
