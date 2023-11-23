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
    minBrushSize: 1,
    brushSizeStep: 1,
    initialBrushSize: 5
  }
};
