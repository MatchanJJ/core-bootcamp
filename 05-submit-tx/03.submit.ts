import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

import {
    Hex,
    createWalletClient,
    getContract,
    http,
    publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
// import artifacts from "/05-submit-tx/submit.artifacts.json";

const abi = [
    {
        "inputs": [
          {
            "internalType": "string",
            "name": "firstname",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "github",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "erc20",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "erc721",
            "type": "address"
          }
        ],
        "name": "recordSubmission",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(`0x${privateKey}` as Hex);

(async () => {
    const client = createWalletClient({
        account,
        transport: http(process.env.API_URL),
    }).extend(publicActions);

    const contractAddress = '0x3b26E8DA9aDedAAe86a260b6354aC1855AA65C14';

    const contract = getContract({
        address: contractAddress,
        abi,
        client,
    });
    const tx = await contract.write.recordSubmission([
        "Mark Jade",
        "MatchanJJ",
        "0x3E0A1b2bD478F7C5711f0f157070B0e3E2116ACb",
        "0xc15a01cd4e62918a5dc630c74df2e6aa119bf1eb",
    ]);
    console.log("tx: ", tx);
})();