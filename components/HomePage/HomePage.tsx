import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useWalletClient } from "wagmi"
import DeployButton from "../DeployButton"
import AudioUpload from "../AudioUpload"
import { useDeploy } from "../../providers/DeployContext"
import CoverArtUploadButton from "../CoverArtUploadButton"

const HomePage = () => {
  const { audioSrc } = useDeploy()
  const { data: walletClient } = useWalletClient()

  return (
    <div className="min-h-screen flex items-center justify-center text-white flex flex-col gap-10">
      <ConnectButton />
      {walletClient && <AudioUpload />}
      {walletClient && <CoverArtUploadButton />}
      {audioSrc && <DeployButton />}
    </div>
  )
}

export default HomePage
