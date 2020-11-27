import * as firebase from 'firebase/app';

export type DocumentSnapshot<T = firebase.default.firestore.DocumentData> = firebase.default.firestore.DocumentSnapshot<T>;

export const FieldValue = firebase.default.firestore.FieldValue;
export type FieldValue = firebase.default.firestore.FieldPath;

export type WriteBatch = firebase.default.firestore.WriteBatch;
export const batch = () => firebase.default.firestore().batch();

export type FirebaseUserCredential = firebase.default.auth.UserCredential;
export type FirebaseUser = firebase.default.User;