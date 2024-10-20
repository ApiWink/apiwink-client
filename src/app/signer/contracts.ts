import { autoSplitContractABI } from "../constants/abis/autoSplitContract";
import { erc20ABI } from "../constants/abis/erc20";
import {
  AUTOSPLIT_CONTRACT_ADDRESS,
  USDC_ADDRESS,
} from "../constants/addresses";

export const USDC = {
  address: USDC_ADDRESS,
  abi: erc20ABI,
};

export const AutoSplit = {
  address: AUTOSPLIT_CONTRACT_ADDRESS,
  abi: autoSplitContractABI,
};
