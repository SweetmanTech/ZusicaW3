import { createContext, useState, useContext, useMemo, useRef } from "react"
import useWaveform from "../hooks/useWaveform"

const DeployContext = createContext({} as any)

export const useDeploy = () => useContext(DeployContext)

export const DeployProvider = ({ children }) => {
  const [audioFile, setAudioFile] = useState(null)
  const [audioSrc, setAudioSrc] = useState(null)
  const { isPlaying, currentTime, wavesurfer, regions, waveformRef } = useWaveform(audioSrc)

  const value = useMemo(
    () => ({
      audioFile,
      setAudioFile,
      audioSrc,
      setAudioSrc,
      isPlaying,
      currentTime,
      wavesurfer,
      regions,
      waveformRef,
    }),
    [
      audioFile,
      setAudioFile,
      audioSrc,
      setAudioSrc,
      isPlaying,
      currentTime,
      wavesurfer,
      regions,
      waveformRef,
    ],
  )

  return <DeployContext.Provider value={value}>{children}</DeployContext.Provider>
}
