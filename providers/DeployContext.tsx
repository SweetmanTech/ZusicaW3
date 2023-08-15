import { createContext, useState, useContext, useMemo, useRef } from "react"
import useWaveform from "../hooks/useWaveform"

const DeployContext = createContext({} as any)

export const useDeploy = () => useContext(DeployContext)

export const DeployProvider = ({ children }) => {
  const [audioFile, setAudioFile] = useState(null)
  const [audioSrc, setAudioSrc] = useState(null)
  const waveformHook = useWaveform(audioSrc)

  const value = useMemo(
    () => ({
      audioFile,
      setAudioFile,
      audioSrc,
      setAudioSrc,
      ...waveformHook,
    }),
    [audioFile, setAudioFile, audioSrc, setAudioSrc, waveformHook],
  )

  return <DeployContext.Provider value={value}>{children}</DeployContext.Provider>
}
