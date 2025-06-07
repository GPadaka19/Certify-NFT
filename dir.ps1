$folders = @(
    "client/public",
    "client/src/components",
    "client/src/pages",
    "client/src/utils",
    "client/src/contexts",
    
    "server/controllers",
    "server/services",
    "server/routes",
    "server/middleware",
    "server/config",
    
    "contracts/scripts",
    "contracts/artifacts",
    
    ".github/workflows",
    "subgraph"
)

$files = @(
    "client/package.json",
    "server/package.json",
    "server/app.ts",
    "contracts/CertificateNFT.sol",
    ".github/workflows/deploy.yml",
    "subgraph/schema.graphql",
    "subgraph/subgraph.yaml",
    "subgraph/mappings.ts",
    "docker-compose.yml",
    "README.md",
    "architecture.md"
)

# Buat folder
foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

# Buat file kosong
foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host "Struktur proyek Certify-NFT berhasil dibuat!"