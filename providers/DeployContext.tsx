import { createContext, useState, useContext, useMemo } from "react"

const DeployContext = createContext({} as any)

export const useDeploy = () => useContext(DeployContext)

export const DeployProvider = ({ children }) => {
  const [audioFile, setAudioFile] = useState(null)
  const [audioSrc, setAudioSrc] = useState(null)

  const value = useMemo(
    () => ({ audioFile, setAudioFile, audioSrc, setAudioSrc }),
    [audioFile, setAudioFile, audioSrc, setAudioSrc],
  )

  return <DeployContext.Provider value={value}>{children}</DeployContext.Provider>
}
