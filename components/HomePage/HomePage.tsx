import { ConnectButton } from "@rainbow-me/rainbowkit"
import DeployButton from "../DeployButton"
import AudioUpload from "../AudioUpload"

const HomePage = () => (
  <div className="min-h-screen flex items-center justify-center text-white flex flex-col gap-10">
    <ConnectButton />
    <AudioUpload />
    <DeployButton />
  </div>
)

export default HomePage
