import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  constructor(private AfAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  signout() {
    this.AfAuth.auth.signOut();
  }

}
