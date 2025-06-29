import "dotenv/config";
import ora from "ora";
import chalk from "chalk";
import { http, type Hex, createPublicClient, parseEther } from "viem";
import { type GetPaymasterDataParameters, createPaymasterClient } from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { soneiumMinato } from "viem/chains";
import { createSmartAccountClient, toStartaleSmartAccount } from "startale-aa-sdk";

const bundlerUrl = process.env.BUNDLER_URL;
const paymasterUrl = process.env.PAYMASTER_SERVICE_URL;
const privateKey = process.env.OWNER_PRIVATE_KEY;

if (!bundlerUrl || !paymasterUrl || !privateKey) {
  throw new Error("BUNDLER_URL, PAYMASTER_SERVICE_URL, or OWNER_PRIVATE_KEY is not set");
}

const chain = soneiumMinato;
const publicClient = createPublicClient({ transport: http(), chain });
const paymasterClient = createPaymasterClient({ transport: http(paymasterUrl) });
const signer = privateKeyToAccount(privateKey as Hex);

const scsContext = { calculateGasLimits: true, policyId: "sudo" };

// Exported function: can be used anywhere in your app!
export async function runStartaleDemo() {
  const spinner = ora({ spinner: "bouncingBar" });
  try {
    spinner.start("Setting up Startale Smart Account...");

    const smartAccountClient = createSmartAccountClient({
      account: await toStartaleSmartAccount({ signer, chain, transport: http() }),
      transport: http(bundlerUrl),
      client: publicClient,
      paymaster: {
        async getPaymasterData(pmDataParams: GetPaymasterDataParameters) {
          pmDataParams.paymasterPostOpGasLimit = BigInt(100000);
          pmDataParams.paymasterVerificationGasLimit = BigInt(200000);
          pmDataParams.verificationGasLimit = BigInt(500000);
          return await paymasterClient.getPaymasterData(pmDataParams);
        },
        async getPaymasterStubData(pmStubDataParams: GetPaymasterDataParameters) {
          return await paymasterClient.getPaymasterStubData(pmStubDataParams);
        },
      },
      paymasterContext: scsContext,
      userOperation: {
        estimateFeesPerGas: async () => ({
          maxFeePerGas: BigInt(10000000),
          maxPriorityFeePerGas: BigInt(10000000),
        }),
      },
    });

    const smartAccountAddress = smartAccountClient.account.address;
    console.log("Smart Account Address:", smartAccountAddress);
    console.log("Signer Address:", signer.address);

    // This is a simple onchain action (sending 0 ETH to a contract)
    const hash = await smartAccountClient.sendUserOperation({
      account: smartAccountClient.account,
      calls: [
        {
          to: "0x8955ed5CAAC29A457F600c3467424373D5745f37",
          value: parseEther("0"),
        },
      ],
    });

    const receipt = await smartAccountClient.waitForUserOperationReceipt({ hash });
    console.log("Receipt:", receipt);

    spinner.succeed("Startale integration demo completed!");
    return { smartAccountAddress, receipt };
  } catch (error) {
    spinner.fail(chalk.red(`Error: ${(error as Error).message}`));
    return { error: (error as Error).message };
  }
}