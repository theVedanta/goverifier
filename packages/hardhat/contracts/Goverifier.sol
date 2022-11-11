//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Goverifier is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private currentId;

    address[] officers;
    mapping(address => uint256) nftHolders;

    bool public isSaleActive = true;

    constructor() ERC721("Goverifier", "GVTV") {
        currentId.increment();
    }

    function mintCustomMultiple(string memory imgURI) public onlyOwner {
        require(isSaleActive, "Sorry, too late lol");

        for (uint256 i = 0; i < officers.length; i++) {
            string memory json = Base64.encode(bytes(string(abi.encodePacked(
                '{ "name": "GVTV #',
                Strings.toString(currentId.current()),
                '", "id": ', Strings.toString(currentId.current()), ', "description": "NFT Marketplace for Goverifier project", ', 
                '"traits": [{ "trait_type": "fast", "value": "true" }, { "trait_type": "Purchased", "value": "true" }], ',
                '"image": "ipfs://', imgURI, '",'
                // '"time": "', time, '" }'
            ))));

            string memory tokenURI = string(abi.encodePacked("data:application/json;base64,", json));

            console.log(tokenURI);

            _safeMint(msg.sender, currentId.current());
            _setTokenURI(currentId.current(), tokenURI);

            _approve(msg.sender, currentId.current());
            safeTransferFrom(msg.sender, officers[i], currentId.current());
            nftHolders[officers[i]] = currentId.current();

            currentId.increment();
        }
    }

    function openSale() public onlyOwner {
        isSaleActive = true;
    }
    function closeSale() public onlyOwner {
        isSaleActive = false;
    }
    function getOfficers() public view returns (address[] memory) {
        return officers;
    }
    function addOfficer(address add) public onlyOwner {
        officers.push(add);
    }
    function removeOfficer(address rem) public onlyOwner {
        for (uint256 i = 0; i < officers.length; i++) {
            if (officers[i] == rem) {
                officers[i] = officers[officers.length - 1];
                officers.pop();
            }
        }
    }
}