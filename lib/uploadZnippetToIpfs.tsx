import { blobToFile } from "./blobToFile"
import { bufferToWav } from "./bufferToWav"
import { clipZnippet } from "./clipZnippet"
import { uploadToIpfs } from "./ipfs"

export const uploadZnippetToIpfs = async (wavesurfer, znippetStart, znippetEnd, audioType) => {
  const clippedBuffer = clipZnippet(znippetStart, znippetEnd, wavesurfer)
  const wavBlob = bufferToWav(clippedBuffer, 0, clippedBuffer.length)
  const finalFile = blobToFile(wavBlob, "Znippets", audioType)
  const cid = await uploadToIpfs(finalFile)
  return cid
}
