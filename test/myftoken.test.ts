import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MyFToken__factory, MyFToken } from '../typechain';

describe('MyFToken', () => {
  let myftoken: MyFToken;
  let signers: SignerWithAddress[];

  beforeEach('Initializing and deploying contract instance', async () => {
    signers = await ethers.getSigners();
    const myftokenFactory = (await ethers.getContractFactory(
      'MyFToken',
      signers[0]
    )) as MyFToken__factory;
    myftoken = await myftokenFactory.deploy();
    await myftoken.deployed();

    expect(myftoken.address).to.properAddress;
  });

  describe('initialize', async () => {
    it('Should mint 500 ERC20 tokens in constructor', async () => {
      let bal = await myftoken.balanceOf(signers[0].address.toString());
      expect(bal).to.equal(500);
    });
    it('Should burn 1 token and have 499', async () => {
      await myftoken.burn(1);
      let bal = await myftoken.balanceOf(signers[0].address.toString());
      expect(bal).to.equal(499);
    });
  });
});
