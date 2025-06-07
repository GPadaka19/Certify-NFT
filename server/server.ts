import express from 'express'
import certificateRoutes from './routes/certificate'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/certificate', certificateRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// PS D:\Certify-NFT\server> npx tsx server.ts
// Need to install the following packages:
// tsx@4.19.4
// Ok to proceed? (y) y
// node:internal/modules/esm/resolve:304
//   return new ERR_PACKAGE_PATH_NOT_EXPORTED(
//          ^

// Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './agent' is not defined by "exports" in D:\Certify-NFT\server\node_modules\@web3-storage\access\package.json
//     at exportsNotFound (node:internal/modules/esm/resolve:304:10)
//     at packageExportsResolve (node:internal/modules/esm/resolve:594:13)
//     at resolveExports (node:internal/modules/cjs/loader:592:36)
//     at Module._findPath (node:internal/modules/cjs/loader:669:31)
//     at Module._resolveFilename (node:internal/modules/cjs/loader:1131:27)
//     at nextResolveSimple (C:\Users\ASUS\AppData\Local\npm-cache\_npx\fd45a72a545557e9\node_modules\tsx\dist\register-D2KMMyKp.cjs:3:942)      
//     at C:\Users\ASUS\AppData\Local\npm-cache\_npx\fd45a72a545557e9\node_modules\tsx\dist\register-D2KMMyKp.cjs:2:2550
//     at C:\Users\ASUS\AppData\Local\npm-cache\_npx\fd45a72a545557e9\node_modules\tsx\dist\register-D2KMMyKp.cjs:2:1624
//     at resolveTsPaths (C:\Users\ASUS\AppData\Local\npm-cache\_npx\fd45a72a545557e9\node_modules\tsx\dist\register-D2KMMyKp.cjs:3:760)
//     at C:\Users\ASUS\AppData\Local\npm-cache\_npx\fd45a72a545557e9\node_modules\tsx\dist\register-D2KMMyKp.cjs:3:1038 {
//   code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
// }

// Node.js v20.13.1
// PS D:\Certify-NFT\server> 