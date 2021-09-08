import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { ethers } from "hardhat"
import { MyNFToken__factory, MyNFToken } from "../typechain"

describe("MyNFToken", () => {
  let mynftoken: MyNFToken
  let signers: SignerWithAddress[]

  beforeEach("Initializing and deploying contract instance", async () =>  {
    signers = await ethers.getSigners();
    const mynftokenFactory = (await ethers.getContractFactory(
      "MyNFToken",
      signers[0]
    )) as MyNFToken__factory;
    mynftoken = await mynftokenFactory.deploy();
    await mynftoken.deployed();

    expect(mynftoken.address).not.null
  })

  describe("initialize", async () => {
    it("Should token in constructor", async () => {
      let result = await mynftoken.symbol()
      expect(result).to.equal("MNFTK")
    })
  })
})
