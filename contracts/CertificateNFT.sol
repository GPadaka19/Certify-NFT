// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721URIStorage, Ownable {
    address public issuer;

    modifier onlyIssuer() {
        require(msg.sender == issuer, "Not authorized: issuer only");
        _;
    }

    function mint(address to, uint256 tokenId, string memory tokenURI) public onlyIssuer {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    constructor() ERC721("CertificateNFT", "CERT") Ownable(msg.sender) {
        issuer = msg.sender;
    }
} 