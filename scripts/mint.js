const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();

  // Replace with your deployed contract address
  const contractAddress = "0x44E1a739F0995b1f99186F9DC79FB4098F3D957b"; // Ensure this is correct
  // Replace with the address you want to mint tokens to
  const recipient = "0xb9E500CF14b355f50217f1a89040DF1765C5E70e"; // Replace with actual recipient address

  // Replace with the amount of tokens you want to mint (remember to include decimals)
  const mintAmount = ethers.utils.parseUnits("1000", 18); // Mint 1000 tokens, assuming 18 decimals

  // Attach to the deployed contract
  const KZToken = await ethers.getContractFactory("KZToken");
  const token = await KZToken.attach(contractAddress);

  console.log("Minting tokens...");

  // Use sendShieldedTransaction to send a shielded transaction
  const tx = await sendShieldedTransaction(deployer, contractAddress, token.interface.encodeFunctionData("mint", [recipient, mintAmount]), 0);

  console.log(`Transaction hash: ${tx.hash}`);

  await tx.wait();

  console.log(`Minted ${mintAmount.toString()} tokens to ${recipient}`);
}

// Define the sendShieldedTransaction function
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpclink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpclink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });