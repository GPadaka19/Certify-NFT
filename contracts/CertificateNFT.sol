// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

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

    // Prevent transfers except mint (from == address(0)) and burn (to == address(0))
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Certificates are non-transferable");
        }
        return super._update(to, tokenId, auth);
    }

    constructor() ERC721("CertificateNFT", "CERT") Ownable(msg.sender) {
        issuer = msg.sender;
    }
} 