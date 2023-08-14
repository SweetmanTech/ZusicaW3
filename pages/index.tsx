import type { NextPage } from "next"
import HomePage from "../components/HomePage"
import { DeployProvider } from "../providers/DeployContext"

const LandingPage: NextPage = () => (
  <DeployProvider>
    <HomePage />
  </DeployProvider>
)

export default LandingPage
