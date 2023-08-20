import { Contract } from "ethers"
import { useAccount, useNetwork } from "wagmi"
import { useRouter } from "next/router"
import abi from "../lib/abi-ZoraNFTCreatorProxy.json"
import { useEthersSigner } from "../lib/useEthersSigner"
import getZoraNFTCreatorProxyAddress from "../lib/getZoraNFTCreatorProxyAddress"
import handleTxError from "../lib/handleTxError"
import { useDeploy } from "../providers/DeployContext"
import { getZoraMintUrl } from "../lib/getZoraMintUrl"
import { uploadToIpfs } from "../lib/ipfs"

const useZoraDeploy = () => {
  const { push } = useRouter()
  const signer = useEthersSigner()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { animationFile, cubierta, titulo, descripcion, direccionDePago } = useDeploy()

  const onSuccess = (receipt) => {
    const { events } = receipt
    const finalEvent = events[events.length - 1]
    const finalEventArgs = finalEvent.args
    const contractAddress = finalEventArgs.editionContractAddress
    const mintPageUrl = getZoraMintUrl(chain.id, contractAddress)
    push(mintPageUrl)
  }

  const createEditionWithReferral = async () => {
    try {
      const audioCid = animationFile ? await uploadToIpfs(animationFile) : ""
      const imageCid = await uploadToIpfs(cubierta)
      const zoraNFTCreatorProxyAddres = getZoraNFTCreatorProxyAddress(chain?.id)
      const contract = new Contract(zoraNFTCreatorProxyAddres, abi, signer)
      const name = titulo || ""
      const symbol = "MW3"
      const editionSize = "18446744073709551615"
      const royaltyBps = 500
      const fundsRecipient = direccionDePago
      const defaultAdmin = address
      const salesConfig = {
        publicSalePrice: 0,
        maxSalePurchasePerAddress: 100,
        publicSaleStart: 0,
        publicSaleEnd: "18446744073709551615",
        presaleStart: 0,
        presaleEnd: 0,
        presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
      }
      const description = descripcion
      const animationUri = audioCid ? `ipfs://${audioCid}` : ""
      const imageUri = `ipfs://${imageCid}`
      const createReferral = process.env.NEXT_PUBLIC_CREATE_REFERRAL || address
      const tx = await contract.createEditionWithReferral(
        name,
        symbol,
        editionSize,
        royaltyBps,
        fundsRecipient,
        defaultAdmin,
        salesConfig,
        description,
        animationUri,
        imageUri,
        createReferral,
      )
      const receipt = await tx.wait()
      onSuccess(receipt)
    } catch (err) {
      handleTxError(err)
    }
  }

  return {
    createEditionWithReferral,
  }
}

export default useZoraDeploy
