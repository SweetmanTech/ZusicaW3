import { Contract } from "ethers"
import { useAccount, useNetwork } from "wagmi"
import abi from "../lib/abi-ZoraNFTCreatorProxy.json"
import { useEthersSigner } from "../lib/useEthersSigner"
import getZoraNFTCreatorProxyAddress from "../lib/getZoraNFTCreatorProxyAddress"
import handleTxError from "../lib/handleTxError"
import { uploadToIpfs } from "../lib/ipfs"
import { useDeploy } from "../providers/DeployContext"
import { clipZnippet } from "../lib/clipZnippet"
import { bufferToWav } from "../lib/bufferToWav"
import { blobToFile } from "../lib/blobToFile"
import { uploadZnippetToIpfs } from "../lib/uploadZnippetToIpfs"

const useZoraDeploy = () => {
  const signer = useEthersSigner()
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { audioFile, wavesurfer, znippetStart, znippetEnd } = useDeploy()

  const createEditionWithReferral = async () => {
    try {
      const cid = await uploadZnippetToIpfs(wavesurfer, znippetStart, znippetEnd, audioFile.type)
      const zoraNFTCreatorProxyAddres = getZoraNFTCreatorProxyAddress(chain?.id)
      const contract = new Contract(zoraNFTCreatorProxyAddres, abi, signer)
      const name = ""
      const symbol = ""
      const editionSize = 10_000
      const royaltyBps = 500
      const fundsRecipient = address
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
      const description = ""
      const animationUri = `ipfs://${cid}`
      const imageUri = ""
      const createReferral = address
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
      await tx.wait()
    } catch (err) {
      handleTxError(err)
    }
  }

  return {
    createEditionWithReferral,
  }
}

export default useZoraDeploy
