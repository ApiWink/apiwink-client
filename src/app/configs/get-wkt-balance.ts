import { ethers } from "ethers";
import { WKT_ADDRESS } from "../constants/addresses";

const provider = new ethers.JsonRpcProvider(
  "https://juicy-low-small-testnet-indexer.skalenodes.com:10008"
);

const tokenAddress = WKT_ADDRESS;

const erc20ABI = ["function balanceOf(address owner) view returns (uint256)"];

const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, provider);

const walletAddress = localStorage.getItem("wallet_address");

export async function getWKTBalance() {
  try {
    const balance = await tokenContract.balanceOf(walletAddress);

    console.log(`Balance: ${ethers.formatUnits(balance, 18)} WKT`);
    return ethers.formatUnits(balance, 18);
  } catch (err) {
    console.error("Error fetching balance:", err);
    return "0";
  }
}
