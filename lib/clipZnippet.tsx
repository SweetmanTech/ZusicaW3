/* eslint-disable no-plusplus */
export const clipZnippet = (regionStart, regionEnd, instance) => {
  const segmentDuration = regionEnd - regionStart
  const originalBuffer = instance.backend.buffer
  const emptySegment = instance.backend.ac.createBuffer(
    originalBuffer.numberOfChannels,
    Math.ceil(segmentDuration * originalBuffer.sampleRate),
    originalBuffer.sampleRate,
  )
  for (let i = 0; i < originalBuffer.numberOfChannels; i++) {
    const chanData = originalBuffer.getChannelData(i)
    const emptySegmentData = emptySegment.getChannelData(i)
    const midData = chanData.subarray(
      Math.ceil(regionStart * originalBuffer.sampleRate),
      Math.ceil(regionEnd * originalBuffer.sampleRate),
    )
    emptySegmentData.set(midData)
  }
  return emptySegment
}
