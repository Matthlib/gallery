const hre = require("hardhat");
const {ethers} = require("hardhat");
const {MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');
const tokens = require('./token.json');

function initialHashWhitelistToken(mintingAdress,allowance){
    return Buffer.from(ethers.utils.solidityKeccak256(['address','uint256'],[mintingAdress, allowance]).slice(2), 'hex');
}

function searchInJson(result, searchFieldAddress){
  for (var i=0 ; i < result.length ; i++)
  {if (result[i].address == searchFieldAddress) {
          return result[i].allowance;
      }
  }
  return 0;
}


async function main() {
//construction du merkle 
const whitelistleaves = tokens.map(token =>
initialHashWhitelistToken(token.address,token.allowance))
console.log('whitelistleaves',whitelistleaves)
//merkle 
  const tree = new MerkleTree(whitelistleaves,keccak256, {sort: true});
  const root = tree.getHexRoot();
  console.log('root',root);
  const baseURI = "https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHH2/";
  const team = "0x5c7f91d1D24b0dA7653f14fC38BB8378a858f91D";
  const totalToBeMinted = 5555;
  const reserved = 55;  
  const presaleReserved = 4444;
  const totalwhitelistsale = 3333;

  /* verification */
  console.log("liste", searchInJson(tokens,"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"));
  var mintleaf = initialHashWhitelistToken("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4","2")
  var mintproof = tree.getHexProof(mintleaf)
  console.log("mintproof",mintproof);
  console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
  
  // We get the contract to deploy
  const Adara = await hre.ethers.getContractFactory("AdaraSentries");
  const adara = await Adara.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);

  await adara.deployed();
  console.log("Statues deployed to:", adara.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
