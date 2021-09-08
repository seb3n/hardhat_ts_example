// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope
import { run, ethers } from 'hardhat';

async function main() {
  await run('compile');

  // const accounts = await ethers.getSigners();
  // console.log(
  //   "Accounts: ",
  //   accounts.map((a) => a.address)
  //   );

  // We get the contract to deploy
  const Item = await ethers.getContractFactory('Item');
  const deployedItem = await Item.deploy();

  await deployedItem.deployed();

  console.log('Item deployed to:', deployedItem.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
