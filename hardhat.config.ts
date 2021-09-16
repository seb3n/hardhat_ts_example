// import { config as dotEnvConfig } from 'dotenv';
// dotEnvConfig();
require('dotenv').config();


import { HardhatUserConfig } from 'hardhat/types';

// Plugins
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import "hardhat-abi-exporter";


const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const RINKEBY_PRIVATE_KEY =
  process.env.RINKEBY_PRIVATE_KEY! ||
  '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'; // well known private key
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

 

const config: HardhatUserConfig = 
{abiExporter: {
  path: 'data/abi',
  clear: true,
  flat: true,
  only: ['Item$'],
  spacing: 2,
  // pretty: true,
},
  defaultNetwork: 'hardhat',
  
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7545',
    },
    // rinkeby: {
    //   url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [RINKEBY_PRIVATE_KEY],
    // },
    // coverage: {
    //   url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    // },
  },
  // etherscan: {
  //   // Your API key for Etherscan
  //   // Obtain one at https://etherscan.io/
  //   apiKey: ETHERSCAN_API_KEY,
  // },
  solidity: {
    compilers: [{ version: '0.8.4', settings: {} }],
  },

  
};

export default config;

