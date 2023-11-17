const config = require('./client/config');

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(`https://eth-rinkeby.alchemyapi.io/v2/${config.infuraApiKey}`);

const contractAddress = '0x42E46546E29087b2f235ADD17567b8cEC7ad1876';

const contractABI = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "key",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "number",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "name": "StructAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "key",
                    "type": "bytes32"
                }
            ],
            "name": "StructRemoved",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "key",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "number",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "name": "addStruct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "myMapping",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "number",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "text",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "flag",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "key",
                    "type": "bytes32"
                }
            ],
            "name": "removeStruct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]];

const walletAddress = '0x42E46546E29087b2f235ADD17567b8cEC7ad1876';

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function addStruct() {
  const key = web3.utils.keccak256('key'); 

  const result = await contract.methods.addStruct(key, 123, 'Example Text', true).send({
    from: walletAddress,
  });

  console.log('Transaction Hash:', result.transactionHash);
  console.log('Struct Added!');
}

async function removeStruct() {
  const key = web3.utils.keccak256('key'); 

  const result = await contract.methods.removeStruct(key).send({
    from: walletAddress,
  });

  console.log('Transaction Hash:', result.transactionHash);
  console.log('Struct Removed!');
}

async function readStruct() {
  const key = web3.utils.keccak256('key'); 
  const result = await contract.methods.myMapping(key).call();

  console.log('Read Struct Result:', result);
}

addStruct();
removeStruct();
readStruct();
