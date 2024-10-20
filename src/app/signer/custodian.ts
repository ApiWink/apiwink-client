import { initializeCustodian } from "../configs";
import { createClient } from "../configs";
import { parseEther, toHex } from "viem";
import { CUSTODIAN_PRIVATE_KEY, WSS_URL } from "../configs/config";

const DEFAULT_FILL_UP_VALUE: bigint = parseEther("0.00000002");

class Custodian {
  nonce = 0;
  custodian;
  client;

  constructor() {
    console.log(CUSTODIAN_PRIVATE_KEY, "CUSTODIAN_PRIVATE_KEY");
    this.custodian = initializeCustodian(
      ("0x" + CUSTODIAN_PRIVATE_KEY) as `0x${string}`
    );
    this.client = createClient();
    this.isValidCustodian();
  }

  public get getCustodian() {
    return this.custodian;
  }

  public get getClient() {
    return this.client;
  }

  public async isValidCustodian() {
    const balance = await this.client.getBalance({
      address: this.custodian.account.address,
    });

    console.log(balance, "balanceee");

    if (balance < parseEther("0.00005")) {
      console.log(balance, "balanceee is less than 0.00005");
      throw new Error("Custodian Balance must be > 0.00005");
    }

    this.nonce = await this.client.getTransactionCount({
      address: this.custodian.account.address,
    });
  }

  public async distribute(to: `0x${string}`) {
    const hash = await this.custodian.sendTransaction({
      to,
      value: DEFAULT_FILL_UP_VALUE,
      nonce: this.nonce++,
    });
    const tx = await this.client.waitForTransactionReceipt({
      hash,
    });
    console.log(tx, "tx for dist");
    return tx;
  }
}

export default new Custodian();
