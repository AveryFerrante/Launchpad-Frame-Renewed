export const environment = {
  production: true,
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
    minBrushSize: 3,
    brushSizeStep: 3,
    initialBrushSize: 9
  }
};
