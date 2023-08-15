export const blobToFile = (theBlob, fileName, audioType) =>
  new File([theBlob], fileName, {
    lastModified: new Date().getTime(),
    type: audioType,
  })
