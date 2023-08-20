import { createContext, useState, useContext, useMemo } from "react"
import { useAccount } from "wagmi"
import useWaveform from "../hooks/useWaveform"

const DeployContext = createContext({} as any)

export const useDeploy = () => useContext(DeployContext)

export const DeployProvider = ({ children }) => {
  const { address } = useAccount()
  const [animationFile, setAnimationFile] = useState(null)
  const [animationSrc, setAnimationSrc] = useState(null)
  const [cubierta, setCover] = useState(null)
  const [titulo, setTitle] = useState("")
  const [descripcion, setDescription] = useState("")
  const [direccionDePago, setFundsRecipient] = useState(address)
  const waveformHook = useWaveform(animationSrc)

  const value = useMemo(
    () => ({
      animationFile,
      setAnimationFile,
      animationSrc,
      setAnimationSrc,
      cubierta,
      setCover,
      titulo,
      setTitle,
      descripcion,
      setDescription,
      direccionDePago,
      setFundsRecipient,
      ...waveformHook,
    }),
    [
      animationFile,
      setAnimationFile,
      animationSrc,
      setAnimationSrc,
      cubierta,
      setCover,
      titulo,
      setTitle,
      waveformHook,
      descripcion,
      setDescription,
      direccionDePago,
      setFundsRecipient,
    ],
  )

  return <DeployContext.Provider value={value}>{children}</DeployContext.Provider>
}
