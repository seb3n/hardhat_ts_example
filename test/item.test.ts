import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import ipfs from 'ipfs-core';
import { Item__factory, Item } from '../typechain';

describe('Item', async () => {
  const ipfsCid = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A';
  let expected;
  let itemContract: Item;
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  beforeEach('instantiate and deploy Item contract', async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const itemFactory = (await ethers.getContractFactory('Item', alice)) as Item__factory;
    itemContract = await itemFactory.deploy();
    await itemContract.deployed();
    expect(itemContract.address).to.be.properAddress;
  });

  describe('when item is created', () => {
    it('should increment counter', async () => {
      await itemContract.addItem(bob.address, ipfsCid);
      await itemContract.addItem(alice.address, ipfsCid);
      expected = await itemContract.ownerOf(BigNumber.from(1));
      expect(expected).to.equal(alice.address);
    });
  });

  describe('when owner of burned item is called', () => {
    it('should revert', async () => {
      await itemContract.addItem(alice.address, ipfsCid);
      await itemContract.burn(BigNumber.from(0));
      await expect(itemContract.ownerOf(BigNumber.from(0))).to.be.reverted;
    });
  });

  describe('when item owner (alice) transfers ownership', () => {
    it('should update owner address (to bob)', async () => {
      await itemContract.addItem(alice.address, ipfsCid);
      await itemContract.transferFrom(alice.address, bob.address, BigNumber.from(0));
      expected = await itemContract.ownerOf(BigNumber.from(0));
      expect(expected).to.equal(bob.address);
    });
  });

  describe('When unapproved 3rd party tries to mint', () => {
    it('should transfer ownership when 3rd party initiated transfer', async () => {
      await expect(itemContract.connect(bob.address).addItem(bob.address, ipfsCid)).to.be.reverted;
    });
  });

  describe('Third party gas free ownership transfer', () => {
    it('should transfer ownership when 3rd party initiated transfer', async () => {
      await itemContract.addItem(alice.address, ipfsCid);
      await itemContract.setApprovalForAll(bob.address, true);
      expected = await itemContract.isApprovedForAll(alice.address, bob.address);
      expect(expected).to.be.true;
      // await itemContract.transferOwnership(cat, { bob.address })
    });
  });

  describe('URI storage utilities', () => {
    it('can add IPFS URI to item', async () => {
      const node = await ipfs.create();
      let { cid } = await node.add('some new item');
      let newItemId = await itemContract.addItem(alice.address, cid.toString());
      expect(cid).is.not.empty;
    });
    it('can get data from IPFS', async () => {
      let uri = await itemContract.tokenURI;
      let data = '';
      const node = await ipfs.create();
      const stream = node.cat(cid);
      for await (const chunk of stream) {
        data += chunk.toString();
      }
      console.log(data);
      expect(data).is.not.empty;
    });
  });

  // describe('Chain scan data retrieval', async () => {
  //   it('should see history of all transactions of past burned item', async () => {
  //     // create item, transfer ownership, transfer ownership, burn it
  //     // check to make sure you can see/query that items lifespan
  //   });
  // });
});
