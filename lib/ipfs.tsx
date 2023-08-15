import { NFTStorage } from "nft.storage"

const FALLBACK_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU0NUY3MmE2RTE4ZTc1REZBMTA3Qjc3REIzNDM1NDNjOTQzMEI0RmQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTgxNTczNTExMSwibmFtZSI6IlpPUkEtY2F0YWxvZy1mYWN0b3J5In0.I7D79KPJxNELLpi0FIHUbtVm3EtegGK7ALLKTH_pvCg"

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || FALLBACK_API_KEY,
})

export const uploadToIpfs = async (content) => {
  const cid = await client.storeBlob(content)
  return cid
}
