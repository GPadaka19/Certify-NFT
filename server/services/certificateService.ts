import { uploadToIPFS } from './ipfsService'

export async function createAndUploadMetadata(name: string, description: string, imageCid: string): Promise<string> {
  const metadata = {
    name,
    description,
    image: `ipfs://${imageCid}`
  }

  const jsonBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  const cid = await uploadToIPFS(jsonBlob)
  return `ipfs://${cid}` // final tokenURI
}