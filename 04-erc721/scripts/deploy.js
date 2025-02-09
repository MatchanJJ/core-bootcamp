// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const maxSupply = 10000; 
  const erc20TokenAddress = "0x3E0A1b2bD478F7C5711f0f157070B0e3E2116ACb"; 
  const mintPrice = hre.ethers.parseUnits("0.000000000000000001", 18); // 1 wei
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const contract = await MyNFT.deploy(maxSupply, erc20TokenAddress, mintPrice);

  await contract.waitForDeployment();
  console.log(`MyNFT deployed to: ${contract.address}`);

  // Approve the allowance
  const ERC20 = await hre.ethers.getContractAt("IERC20", erc20TokenAddress);
  const approveTx = await ERC20.approve(contract.target, mintPrice);
  await approveTx.wait();
  console.log(`Approved ${mintPrice.toString()} tokens for MyNFT contract`);



  console.log(`MyNFT deployed to: ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});