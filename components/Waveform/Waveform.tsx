import { useCallback, useRef } from "react"
import useWaveform from "../../hooks/useWaveform"

const Waveform = (props) => {
  const containerRef = useRef()
  const { wavesurfer, regions, isPlaying, currentTime } = useWaveform(containerRef, props)

  const onPlayClick = useCallback(() => {
    const playable = regions.getRegions()[0]
    console.log("SWEETS PLAY SNIPPET?", regions.getRegions())

    return wavesurfer.isPlaying() ? wavesurfer.pause() : playable.play()
  }, [wavesurfer, regions])

  return (
    <>
      <div ref={containerRef} className="min-h-[120px] min-w-[50vw]" />

      <button type="button" onClick={onPlayClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <p>Seconds played: {currentTime}</p>
    </>
  )
}

export default Waveform
