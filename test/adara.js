const { expect } = require("chai");
const { ethers } = require("hardhat");
const {MerkleTree} = require('merkletreejs');
const tokens = require('../scripts/token.json');
const keccak256 = require('keccak256');
const hre = require("hardhat");
const { checkProperties } = require("ethers/lib/utils");



function initialHashWhitelistToken(mintingAdress,allowance){
    return Buffer.from(ethers.utils.solidityKeccak256(['address','uint256'],[mintingAdress, allowance]).slice(2), 'hex');
}

function searchInJson(result, searchFieldAddress){
  for (var i=0 ; i < result.length ; i++)
  {if (result[i].address.toUpperCase() == searchFieldAddress.toUpperCase()) {
          return result[i].allowance;
      }
  }
  return 0;
}




const whitelistleaves = tokens.map(token =>
    initialHashWhitelistToken(token.address,token.allowance))
const tree = new MerkleTree(whitelistleaves,keccak256, {sort: true});
const root = tree.getHexRoot();
const baseURI = "https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHH/";
const team = "0x8b48DAb17D0E0F5e4Fa77d087Eed83313d5FF630";
const totalToBeMinted = 5555; // total supply
const totalwhitelistsale = 3333; // total nft vendu durant la whitelist
const reserved = 55;  // reserve pour la team
const presaleReserved = 3333; // meme nombre que totalwhitelistsale mais utilisé pour le decrement




// Traditional Truffle test
describe("AdaraSentries", function () {
    it("Initialization of the contract and its state variables in the right way", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        // We get the contract to deploy
        await expect(await statues.getTeam()).to.equal("0x8b48DAb17D0E0F5e4Fa77d087Eed83313d5FF630");
        await expect(await statues._baseTokenURI()).to.equal("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHH/");
        await expect(await statues._totalToBeMinted()).to.equal(5555);
        await expect(await statues._reserved()).to.equal(55);
        await expect(await statues._presaleReserved()).to.equal(3333);
       // await expect(await statues._merkleRoot()).to.equal(root); mise en private pour eviter les mint sauvage sur le contract (bot)
    });

    it("Read/write the price", async function () {
        // We get the contract to deploy
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        await expect(await statues.getPrice()).to.equal("200000000000000000")
        await expect(await statues.setPrice(1))
        await expect(await statues.getPrice()).to.equal(1)
    });

    it("Read/write the BaseURI", async function () {
        // We get the contract to deploy
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        await expect(await statues._baseTokenURI()).to.equal("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHH/");
        await expect(await statues.setBaseURI("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDF/"))
        await expect(await statues._baseTokenURI()).to.equal("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDF/")
    });



    it("Able to check if a user is in wl", async function () {
        // We get the contract to deploy
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        var addressToTest = '0x5c7f91d1D24b0dA7653f14fC38BB8378a858f91D' ;
        var allowance = searchInJson(tokens,addressToTest);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf)
        console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        await expect(await statues.isWhitelisted(addressToTest,allowance, mintproof)).to.equal(true);

        var addressToTest = '0x3dEA4806B878763e62528D7F3721E5C15B940Fed' ;
        var allowance = searchInJson(tokens,addressToTest);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf)
        console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        await expect(await statues.isWhitelisted(addressToTest,allowance, mintproof)).to.equal(false);
 
    });

    it("Able to dynamically change the wl and the root while keeping former white-listed accounts", async function () {
        tokens.push({"balance":"10000.0","allowance":"5","address":"0x3dEA4806B878763e62528D7F3721E5C15B940Fed"})

        const whitelistleaves = tokens.map(token =>
            initialHashWhitelistToken(token.address,token.allowance))
        const tree = new MerkleTree(whitelistleaves,keccak256, {sort: true});
        const root = tree.getHexRoot();
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        var addressToTest = '0x3dEA4806B878763e62528D7F3721E5C15B940Fed' ;
        var allowance = searchInJson(tokens,addressToTest);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf)
        //console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        await expect(await statues.isWhitelisted(addressToTest,allowance, mintproof)).to.equal(true);

        var addressToTest = '0x5c7f91d1D24b0dA7653f14fC38BB8378a858f91D' ;
        var allowance = searchInJson(tokens,addressToTest);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf)
        //console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        await expect(await statues.isWhitelisted(addressToTest,allowance, mintproof)).to.equal(true);
 

    });

    it("Able to call specific functions if I'm the owner", async function () {
        // We get the contract to deploy
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        //expect(await statues.connect(owner).setPrice(2)).to.throw("3333");
        await statues.connect(owner).setBaseURI("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHF/")
        await expect(await statues.connect(owner)._baseTokenURI()).to.equal("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHF/");
    });

    it("Able to call specific functions I'm not the owner", async function () {
        // We get the contract to deploy
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        //here, add changin the presale and the paused parameter changing if you're not the owner
        //expect(await statues.connect(owner).setPrice(2)).to.throw("3333");
        await expect(statues.connect(addr1).setBaseURI("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHFABCDECHANGE/")).to.be.revertedWith("Ownable: caller is not the owner");
        await expect(await statues.connect(owner)._baseTokenURI()).to.equal("https://ipfs.billionaireclubnft.com/ipfs/QmXmZWMiWmjmkJvhztPYiDjsdT1KuUPndLCvQvfGANDHH/");
        
    });


    it("Function to verify failures mode of minting", async function () {
        // We get the contract to deploy
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)
        
        await expect(statues.connect(addr1).summon(1)).to.be.revertedWith("Paused")
        
        
        await expect(await statues.connect(owner)._paused()).to.equal(true);
        await statues.connect(owner).pause(false)
        await expect(await statues.connect(owner)._paused()).to.equal(false);
        
        
        await expect(statues.connect(addr1).summon(1)).to.be.revertedWith("presale")
        
        
        await expect(await statues.connect(owner)._presale()).to.equal(true);
        await statues.connect(owner).presale(false)
        await expect(await statues.connect(owner)._presale()).to.equal(false)
        
        await expect(statues.connect(addr1).summon(1, {from: addr1.address, value: 1e9})).to.be.revertedWith("!EthAmount")
        await expect(statues.connect(addr1).summon(2, {from: addr1.address, value: price})).to.be.revertedWith("!EthAmount")
        await expect(statues.connect(addr1).summon(10)).to.be.revertedWith("!NftAmount");

        let balance = await statues.balanceOf(addr1.address)
        expect(balance).to.equal(0)
        
        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init)
    });


    it("Function to verify failures mode of wl minting", async function () {
        // We get the contract to deploy
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1, addr2] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
                

        var addressToTest = addr1.address ;
        var allowance = searchInJson(tokens,addr1.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);
        //console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        await expect(await statues.isWhitelisted(addressToTest,allowance, mintproof)).to.equal(true);


        var supply_init = await statues.totalSupply();
        await expect(await statues.connect(owner)._paused()).to.equal(true);
        expect(supply_init).to.equal(1)

        await expect(statues.connect(addr1).whitelistSummon(1,allowance, mintproof,{from: addr1.address, value: price})).to.be.revertedWith("Paused")

        
        await expect(await statues.connect(owner)._paused()).to.equal(true);
        await statues.connect(owner).pause(false)
        await expect(await statues.connect(owner)._paused()).to.equal(false);
        await expect(await statues.connect(owner)._presale()).to.equal(true);

        await statues.connect(addr1).whitelistSummon(1,allowance, mintproof,{from: addressToTest, value: price})
        var supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(2)

        signer_wl = addr2

        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);

        //console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        await expect(statues.connect(signer_wl).whitelistSummon(10,allowance, mintproof)).to.be.revertedWith("!NftAmount")
        await expect(statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: 1e9})).to.be.revertedWith("!EthAmount")
        await expect(statues.connect(signer_wl).whitelistSummon(2,allowance, mintproof, {from: signer_wl.address, value: price})).to.be.revertedWith("!EthAmount")
        let balance = await statues.balanceOf(addr1.address)
        expect(balance).to.equal(1)

        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init)
        
    });

    it("Function to verify minting", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
        let balance_init = await statues.balanceOf(addr1.address)
        expect(balance_init).to.equal(0)
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)

        await statues.connect(owner).pause(false)
        await statues.connect(owner).presale(false)
        
        let toto = await statues.connect(addr1).summon(1, {from: addr1.address, value: price})
		await toto.wait();
		let balance = await statues.balanceOf(addr1.address)
        expect(balance).to.equal(1)

        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init.add(1))

    });

    it("Function to verify amount minted incrementally 1", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
        let balance_init = await statues.balanceOf(addr1.address)
        expect(balance_init).to.equal(0)
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)

        await statues.connect(owner).pause(false)
        await statues.connect(owner).presale(false)
        
        let toto = await statues.connect(addr1).summon(1, {from: addr1.address, value: price})
		await toto.wait();
		let balance = await statues.balanceOf(addr1.address)
        expect(balance).to.equal(1)

        let toto2 = await statues.connect(addr1).summon(1, {from: addr1.address, value: price})
		await toto2.wait();
		let balance2 = await statues.balanceOf(addr1.address)
        expect(balance2).to.equal(2)

        await expect(statues.connect(addr1).summon(1)).to.be.revertedWith("!NftAmount")
        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init.add(2))
    });

    it("Function to verify amount minted incrementally 2", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
        let balance_init = await statues.balanceOf(addr1.address)
        expect(balance_init).to.equal(0)
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)

        await statues.connect(owner).pause(false)
        await statues.connect(owner).presale(false)
        
        let toto = await statues.connect(addr1).summon(2, {from: addr1.address, value: price.mul(2)})
		await toto.wait();
		let balance = await statues.balanceOf(addr1.address)
        expect(balance).to.equal(2)

        await expect(statues.connect(addr1).summon(1)).to.be.revertedWith("!NftAmount")
        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init.add(2))
    });

    it("Function to verify wl minting", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1, addr2] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
        signer_wl = addr2

        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);

        leaf_wl = await keccak256(signer_wl.address)
        proof_wl = tree.getHexProof(leaf_wl)
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)
        
        let balance_init = await statues.balanceOf(addr2.address)
        expect(balance_init).to.equal(0)
        await statues.connect(owner).pause(false)

        //console.log("Leaf Exists1 : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        let toto = await statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: price})

		await toto.wait();
		let balance = await statues.balanceOf(signer_wl.address)
        expect(balance).to.equal(1)
        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init.add(1))

    });

    it("Function to verify amount minted incrementally during wl 1", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1, addr2] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
        signer_wl = addr2
        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)
        
        let balance_init = await statues.balanceOf(addr2.address)
        expect(balance_init).to.equal(0)
        await statues.connect(owner).pause(false)

        
        let toto = await statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: price})
		await toto.wait();
		let balance = await statues.balanceOf(signer_wl.address)
        expect(balance).to.equal(1)

        let toto2 = await statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: price})
		await toto2.wait();
		let balance2 = await statues.balanceOf(signer_wl.address)
        expect(balance2).to.equal(2)

        let toto3 = await statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: price})
		await toto3.wait();
		let balance3 = await statues.balanceOf(signer_wl.address)
        expect(balance3).to.equal(3)
        expect(balance3).to.equal(3)

        console.log("Leaf Exists : ",tree.verify(mintproof,mintleaf,tree.getHexRoot()));
        console.log("allowance : ",allowance,"  addressToTest  : ",addressToTest);
        await expect(statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: price})).to.be.revertedWith("!NftAmount")


        let balance4 = await statues.balanceOf(signer_wl.address)
        expect(balance4).to.equal(allowance)

    });

    it("Function to verify amount minted incrementally during wl 2", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1, addr2] = await ethers.getSigners();
        let price = await statues.connect(owner).getPrice();
        signer_wl = addr2

        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);

        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)
        
        let balance_init = await statues.balanceOf(addr2.address)
        expect(balance_init).to.equal(0)
        await statues.connect(owner).pause(false)

        
        let toto = await statues.connect(signer_wl).whitelistSummon(allowance,allowance, mintproof, {from: signer_wl.address, value: price.mul(allowance)})
		await toto.wait();
		let balance = await statues.balanceOf(signer_wl.address)
        expect(balance).to.equal(allowance)

        await expect(statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof,{from: signer_wl.address, value: price.mul(allowance)})).to.be.revertedWith("!NftAmount")
        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init.add(allowance))
    });


    it("Testing Giveaway", async function () {
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        const [owner, addr1] = await ethers.getSigners();
        
        
        let balance_init = await statues.balanceOf(addr1.address)
        expect(balance_init).to.equal(0)
        let _reserved = await statues.connect(owner)._reserved()
        
        await expect(statues.connect(owner).giveAway(addr1.address, _reserved.add(1))).to.be.revertedWith(">reserved")
        await expect(statues.connect(owner).giveAway(addr1.address, 0)).to.be.revertedWith("_amount==0")

        
        let toto = await statues.connect(owner).giveAway(addr1.address, 2)
		await toto.wait();
		let balance = await statues.balanceOf(addr1.address)
        expect(balance).to.equal(2)

        await expect(statues.connect(owner).giveAway(addr1.address, _reserved)).to.be.revertedWith(">reserved")

        let balance2 = await statues.balanceOf(addr1.address)
        expect(balance2).to.equal(2)

        let _reserved2 = await statues.connect(owner)._reserved()
        expect(_reserved2).to.equal(_reserved-2)
    });

    

    it("Testing Supply", async function () {
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team, 5, 1, 1, 1, root);
        await statues.deployed();
        let price = await statues.connect(owner).getPrice();
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)

        await statues.connect(owner).pause(false)
        await statues.connect(owner).presale(false)
        
        let toto = await statues.connect(addr3).summon(2, {from: addr3.address, value: price.mul(2)})
		await toto.wait();
		let balance3 = await statues.balanceOf(addr3.address)
        expect(balance3).to.equal(2)

        await expect(statues.connect(addr1).summon(2)).to.be.revertedWith(">MaxSupply")
        let balance1 = await statues.balanceOf(addr1.address)
        expect(balance1).to.equal(0)

        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init.add(2))
        
        let toto2 = await statues.connect(addr2).summon(1, {from: addr2.address, value: price})
		await toto2.wait();
		let balance2 = await statues.balanceOf(addr2.address)
        expect(balance2).to.equal(1)
        
        await expect(statues.connect(addr2).summon(1)).to.be.revertedWith(">MaxSupply")

        signer_wl = addr2
        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);
        await statues.connect(owner).presale(true)


        let supply_final2 = await statues.totalSupply();

        await expect(statues.connect(signer_wl).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: price})).to.be.revertedWith(">availableSupply")
		
    });


    it("Testing WL Supply", async function () {
        const [owner, addr1, addr2, addr3] = await ethers.getSigners();
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team, 5, 0, 1, 1, root);
        await statues.deployed();
        let price = await statues.connect(owner).getPrice();

        signer_wl = addr2

        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)
        
        let balance_init = await statues.balanceOf(addr2.address)
        expect(balance_init).to.equal(0)
        await statues.connect(owner).pause(false)

        await expect(statues.connect(addr2).whitelistSummon(1,allowance, mintproof, {from: signer_wl.address, value: price})).to.be.revertedWith(">availableSupply White List")
    });

    it("Testing Withdraw", async function () {
        const [owner, addr1, team] = await ethers.getSigners();
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team.address,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        let price = await statues.connect(owner).getPrice();
        let supply_init = await statues.totalSupply();
        expect(supply_init).to.equal(1)
        
        let balance_team = await team.getBalance()

        await statues.connect(owner).pause(false)
        await statues.connect(owner).presale(false)
        
        let toto = await statues.connect(addr1).summon(2, {from: addr1.address, value: price.mul(2)})
		await toto.wait();
		let balance = await statues.balanceOf(addr1.address)
        expect(balance).to.equal(2)

        await expect(statues.connect(addr1).summon(1)).to.be.revertedWith("!NftAmount")
        let supply_final = await statues.totalSupply();
        expect(supply_final).to.equal(supply_init.add(2))

        await statues.connect(owner).withdrawAll()
        let balance_team2 = await team.getBalance()

        expect(balance_team2).to.equal(balance_team.add(price.mul(2)))
    });


    it("Gas estimates: changing the base URI", async function () {
        const [owner, addr1, team] = await ethers.getSigners();
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team.address,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();
        let gas = await statues.connect(owner).estimateGas.setBaseURI("");
        let gasprice = await statues.provider.getGasPrice()
        let gas_fee = gas.mul(gasprice)
        let gas_fee_eth = ethers.utils.formatEther(gas_fee)
        console.log('Ether necessary in order to change the base URI '+gas_fee_eth)
        
    });

    it("Gas estimates: check if a user is WLed", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI,team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();

        signer_wl = addr2

        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);

        let gas = await statues.connect(addr2).estimateGas.isWhitelisted(addr2.address,allowance, mintproof)
        let gasprice = await statues.provider.getGasPrice()
        let gas_fee = gas.mul(gasprice)
        let gas_fee_eth = ethers.utils.formatEther(gas_fee)
        console.log('Ether necessary in order to check is a user is in the WL ' + gas_fee_eth)
    });

    it("Gas estimates: minting during WL", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Statues = await hre.ethers.getContractFactory("AdaraSentries");
        const statues = await Statues.deploy(baseURI, team,totalToBeMinted, totalwhitelistsale, reserved,presaleReserved, root);
        await statues.deployed();

        await statues.connect(owner).pause(false)

        var addressToTest = addr2.address ;
        var allowance = searchInJson(tokens,addr2.address);
        var mintleaf = initialHashWhitelistToken(addressToTest,allowance);
        var mintproof = tree.getHexProof(mintleaf);
        let price = await statues.connect(owner).getPrice()
        let gas = await statues.connect(addr2).estimateGas.whitelistSummon(2 ,allowance, mintproof, {from: addr2.address, value: price.mul(2)})
        let gasprice = await statues.provider.getGasPrice()
        let gas_fee = gas.mul(gasprice)
        let gas_fee_eth = ethers.utils.formatEther(gas_fee)
        console.log('Ether necessary in order to mint during WL '+gas_fee_eth)
    });

});