import { useDeploy } from "../../providers/DeployContext"

const Waveform = () => {
  const { isPlaying, currentTime, waveformRef, onPlayClick } = useDeploy()

  return (
    <>
      <div ref={waveformRef} className="min-h-[120px] min-w-[50vw]" />

      <button type="button" onClick={onPlayClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <p>Seconds played: {currentTime}</p>
    </>
  )
}

export default Waveform
