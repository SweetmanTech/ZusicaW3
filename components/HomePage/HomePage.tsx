import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useWalletClient } from "wagmi"
import DeployButton from "../DeployButton"
import { useDeploy } from "../../providers/DeployContext"
import CoverArtUploadButton from "../CoverArtUploadButton"
import TituloYDescripcion from "../TituloYDescripcion/TituloYDescripcion"

const HomePage = () => {
  const { cubierta } = useDeploy()
  const { data: walletClient } = useWalletClient()

  return (
    <div className="min-h-screen flex items-center justify-center text-white flex flex-col gap-10">
      <ConnectButton />
      {walletClient && <CoverArtUploadButton />}
      {walletClient && <TituloYDescripcion />}
      {cubierta && <DeployButton />}
    </div>
  )
}

export default HomePage
