import firebase from 'firebase/app';

export type DocumentSnapshot<T = firebase.firestore.DocumentData> = firebase.firestore.DocumentSnapshot<T>;

export type FieldValue = firebase.firestore.FieldValue;

export type WriteBatch = firebase.firestore.WriteBatch;

export type FirebaseUserCredential = firebase.auth.UserCredential;
export type FirebaseUser = firebase.User;