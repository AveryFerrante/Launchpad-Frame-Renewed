// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseCollections: {
    users: {
      name: 'Users'
    },
    usernames: {
      name: 'Usernames'
    },
    frames: {
      name: 'Frames',
      images: {
        name: 'Images'
      }
    }
  },
  imageUploadProperties: {
    cacheControlValues: ['public', 'max-age=604800', 'immutable']
  },
  imageEditingProperties: {
    maxBrushSize: 30,
    minBrushSize: 1,
    brushSizeStep: 1,
    initialBrushSize: 5
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
