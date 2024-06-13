function getURL(image) {
  return `/api/images/${image.id}/${image.originalFilename}`;
}

export function createFrontendImageFromDbImage(image) {
  return {
    ...image.toObject(), // toObject()-call is needed to be able to destructure the db object properly
    src: getURL(image),
  };
}
