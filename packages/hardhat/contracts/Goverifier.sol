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
    string[] proposals;
    string latestCID;
    uint256 posVotes = 0;
    uint256 negVotes = 0;

    mapping(string => bool) passed;
    mapping(address => bool) voted;

    bool public isSaleActive = true;

    constructor() ERC721("Goverifier", "GVTV") {
        currentId.increment();
    }

    function mintCustom(string memory imgURI) public onlyOwner {
        require(isSaleActive, "Sorry, too late lol");

        latestCID = imgURI;

        for (uint256 i = 0; i < officers.length; i++) {
            string memory json = Base64.encode(bytes(string(abi.encodePacked(
                '{ "name": "GVTV #',
                Strings.toString(currentId.current()),
                '", "id": ', Strings.toString(currentId.current()), ', "description": "NFT Minter for Goverifier project", ', 
                '"traits": [{ "trait_type": "VIP", "value": "true" }, { "trait_type": "Purchased", "value": "true" }, {"trait_type": "Attending", "value": "false"}],',
                '"image": "ipfs://', imgURI, '" }'
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
    function addOfficer(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            officers.push(addresses[i]);
        }
    }
    function removeOfficer(address rem) public onlyOwner {
        for (uint256 i = 0; i < officers.length; i++) {
            if (officers[i] == rem) {
                officers[i] = officers[officers.length - 1];
                officers.pop();
            }
        }
    }

    function verifyUser(address add) public view returns (bool) {
        return nftHolders[add] != 0;
    }

    function changeNFT(address addr) public {
        uint256 tokenId = nftHolders[addr];
        string memory json = Base64.encode(bytes(string(abi.encodePacked(
                '{ "name": "GVTV #',
                tokenId,
                '", "id": ', tokenId, ', "description": "NFT Minter for Goverifier project", ', 
                '"traits": [{ "trait_type": "VIP", "value": "true" }, { "trait_type": "Purchased", "value": "true" }, {"trait_type": "Attending", "value": "true"}],',
                '"image": "ipfs://, ', latestCID, '" }'
            ))));

            string memory tokenURI = string(abi.encodePacked("data:application/json;base64,", json));

            console.log(tokenURI);

            _setTokenURI(tokenId, tokenURI);
    }

    function getProposal() public view returns (string[] memory) {
        return proposals;
    }
    function newProposal(string memory name) public onlyOwner {
        proposals.push(name);
    }
    function vote(string memory name, uint256 voteVal) public {
        require(!voted[msg.sender], "Already voted");

        if (voteVal == 2) {
            negVotes += 1;
        } else if (voteVal == 1) {
            posVotes += 1;
        }

        if (posVotes == negVotes) {
            passed[name] = true;
        } else if (posVotes > negVotes) {
            passed[name] = true;
        } else {
            passed[name] = false;
        }

        voted[msg.sender] = true;
    }
    function clearVotes() public {
        posVotes = 0;
        negVotes = 0;
    }
    function getVotes(string memory name) public view returns (bool) {
        return passed[name];
    }
}