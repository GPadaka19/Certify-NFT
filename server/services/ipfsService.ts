import { create, Client } from '@web3-storage/w3up-client'

const w3upToken = process.env.W3UP_TOKEN || ''

async function getClient(): Promise<Client> {
  if (!w3upToken) {
    throw new Error('W3UP_TOKEN missing in env')
  }
  const client = await create()
  // The token should be in the format "did:key:..."
  await client.login(w3upToken as `${string}@${string}`)
  return client
}

export async function uploadToIPFS(content: File | Blob | Uint8Array | string): Promise<string> {
  const client = await getClient()

  let data: Blob
  if (typeof content === 'string') {
    data = new Blob([content])
  } else if (content instanceof Uint8Array) {
    data = new Blob([content])
  } else {
    data = content
  }

  const upload = await client.uploadFile(data)
  return upload.toString()
}
