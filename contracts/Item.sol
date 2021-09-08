// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Item is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721('Item', 'ITM') {}

  // function addItem(address to, string memory tokenURI)
  //     public
  //     onlyOwner
  //     returns (uint256)
  // {
  //     uint256 newItemId = _tokenIdCounter.current();
  //     safeMint(to);
  //     _setTokenURI(tokenURI)
  //     return newItemId;
  // }

  function safeMint(address to) public onlyOwner {
    // TODO - make internal
    _safeMint(to, _tokenIdCounter.current());
    _tokenIdCounter.increment();
  }

  // The following functions are overrides required by Solidity.

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }
}
