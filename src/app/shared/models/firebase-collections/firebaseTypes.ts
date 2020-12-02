import * as firebase from 'firebase';

export type DocumentSnapshot<T = firebase.default.firestore.DocumentData> = firebase.default.firestore.DocumentSnapshot<T>;

export const FieldValue = firebase.default.firestore.FieldValue;
export type FieldValue = firebase.default.firestore.FieldValue;

export type WriteBatch = firebase.default.firestore.WriteBatch;
export const firestore = firebase.default.firestore();

export type FirebaseUserCredential = firebase.default.auth.UserCredential;
export type FirebaseUser = firebase.default.User;