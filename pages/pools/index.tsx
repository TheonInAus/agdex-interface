import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  formatAptosDecimal,
  generateFunctionPath,
  getAptosCoinBalance,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import useTokenStore from "@/chainio/useTokenStore"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CustomTooltip } from "@/components/ui/customToolTip"
import { ListItem } from "@/components/ui/listItem"
import { PositionItem } from "@/components/ui/positionItem"
import { SimpleInputBox } from "@/components/ui/simpleInputBox"
import { Stats } from "@/components/ui/stats"
import {
  StyledTabs,
  StyledTabsContent,
  StyledTabsList,
  StyledTabsTrigger,
} from "@/components/ui/styledTab"
import { TokenInputBox } from "@/components/ui/tokenInputBox"
import TokenPairWidget from "@/components/ui/tokenPair/TokenPairWidget"
import { UnStats } from "@/components/ui/unStats"
import Iconify from "@/components/Iconify"
import TradingViewWidgetSmall from "@/components/tradingViewSmall"

import { aptos, moduleAddress } from "../_app"

const poolList: any[] = [
  {
    token: "SUI",
    price: "$1.67526",
    available: "133,256.53",
    reserve: "133,256.53",
    targetWeight: "20%",
    currentWeight: "10%",
    utilization: "23.46%",
  },
  {
    token: "USDC",
    price: "$0.99997",
    available: "2123,256.53",
    reserve: "33,222.53",
    targetWeight: "60%",
    currentWeight: "32%",
    utilization: "15.46%",
  },
  {
    token: "USDT",
    price: "$1.0009",
    available: "755,656.53",
    reserve: "83,2536.53",
    targetWeight: "76%",
    currentWeight: "23%",
    utilization: "3.46%",
  },
]

export default function PrepPoolsWidget() {
  const { symbol, vault } = useTokenStore()
  const [tokenBalance, setTokenBalance] = useState("0")
  const { account, signAndSubmitTransaction } = useWallet()
  const fetchBalance = async () => {
    const { result } = await getAptosCoinBalance(
      account?.address || "",
      vault.tokenStore as APTOS_ADDRESS
    )
    const temp = parseAptosDecimal(
      Number(result.coin.value),
      vault.decimal
    ).toFixed(6)
    setTokenBalance(temp)
  }
  useEffect(() => {
    if (account?.address) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, vault])

  const [amount, setAmount] = useState("")

  //   // build a transaction
  // const transaction = await aptos.transaction.build.simple({
  //   sender: alice.accountAddress,
  //   data: {
  //     function: "0x1::coin::transfer",
  //     typeArguments: ["0x1::aptos_coin::AptosCoin"],
  //     functionArguments: [bobAddress, 100],
  //   },
  // });

  // // using sign and submit separately
  // const senderAuthenticator = aptos.transaction.sign({
  //   signer: alice,
  //   transaction,
  // });
  // const committedTransaction = await aptos.transaction.submit.simple({
  //   transaction,
  //   senderAuthenticator,
  // });

  // // using signAndSubmit combined
  // const committedTransaction = await aptos.signAndSubmitTransaction({
  //   signer: alice,
  //   transaction,
  // });

  const handleBuyLP = async () => {
    console.log("🚀 ~ handleBuyLP ~ vault.tokenAddress:", vault.tokenAddress)
    console.log(
      "🚀 ~ handleBuyLP ~ generateFunctionPath(moduleAddress)",
      generateFunctionPath(moduleAddress, "market", "deposit")
    )

    const response = await signAndSubmitTransaction({
      sender: account?.address,
      data: {
        function: generateFunctionPath(moduleAddress, "market", "deposit"),
        typeArguments: [vault.tokenAddress],
        functionArguments: [formatAptosDecimal(100, 6), 0],
      },
    })
    try {
      await aptos.waitForTransaction({ transactionHash: response.hash })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-col gap-4 w-[1250px]">
        {/* <Card> */}
        {/* <div className="flex flex-row items-center justify-between px-10 py-4">
            <TokenPairWidget token0={"USDC"} token1={"USDT"} />
            <Stats title={"Price"} value={`$ 100`} />
            <Stats title={"Total Supple"} value={`0 AGLP`} />
            <Stats title={"Market Cap"} value={`$ 98`} />
            <Stats title={"APR"} value={`0%`} />
            <Stats title={"Stake Reward"} value={`0%`} />
          </div>
        </Card>
        <div className="flex items-center justify-center w-full text-base font-bold bg-0xbox">
          <Iconify icon="iconoir:light-bulb-on" />
          <div>
            Mint AGLP Tokens to earn fees from swaps and leverage tradings.
          </div>
          <a href="google.com" className="ml-2 underline text-agdexMain">
            Learn more
          </a>
        </div> */}

        {/* <Card className="p-6">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="text-2xl font-extrabold text-agdexMain">
                  {" "}
                  Stake To Earn Reward
                </div>

                <div className="w-[650px] mt-5 font-medium">
                  {" "}
                  You can stake AGLP to receive AGT as the reward. The amount of
                  AGT you receive is determined by your share in the Stake Pool,
                  and rewards are settled every second.
                </div>
              </div>
              <div className="h-[50px]" />
              <div className="flex flex-col">
                <div className="text-lg font-extrabold text-agdexMain">
                  {" "}
                  Portfolio
                </div>
                <div className="flex flex-row justify-between mt-2 w-[500px]">
                  <UnStats title={"Unstaked"} value={`0 AGLP`} />
                  <div className="h-full border border-muted" />
                  <UnStats title={"Staked"} value={`0 AGLP`} />
                  <div className="h-full border border-muted" />
                  <UnStats title={"Claimable rewards"} value={`0 Ap`} />
                </div>
              </div>
            </div>
            <div>
              <StyledTabs defaultValue="stake" className="w-[400px] ">
                <StyledTabsList className="w-[400px] h-[40px]">
                  <StyledTabsTrigger
                    value="stake"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Stake
                  </StyledTabsTrigger>
                  <StyledTabsTrigger
                    value="unstake"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Unstake
                  </StyledTabsTrigger>
                </StyledTabsList>
                <StyledTabsContent value={"stake"}>
                  <TokenInputBox
                    title="Stake Amount"
                    value={""}
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <StyledTabsContent value={"unstake"}>
                  <TokenInputBox
                    title="Unstake Amount"
                    value={""}
                    maxNode={<div className="rounded-xl">max</div>}
                  />
                </StyledTabsContent>
                <Button className="w-full h-[50px] mt-6 bg-agdexMain text-xl font-bold">
                  Stake
                </Button>
              </StyledTabs>
            </div>
          </div>
        </Card> */}

        <Card>
          <div className="flex flex-row gap-5 p-2">
            <div className="flex-1">
              <TradingViewWidgetSmall tokenName={"APT"} />
            </div>
            <div>
              <StyledTabs defaultValue="buy" className="w-[400px] ">
                <StyledTabsList className="w-[400px] h-[40px]">
                  <StyledTabsTrigger
                    value="buy"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Buy AGLP
                  </StyledTabsTrigger>
                  <StyledTabsTrigger
                    value="sell"
                    className="flex justify-center w-1/2 h-full"
                  >
                    Sell AGLP
                  </StyledTabsTrigger>
                </StyledTabsList>
                <StyledTabsContent
                  value={"buy"}
                  className="flex flex-col gap-5"
                >
                  <TokenInputBox
                    title="Pay"
                    value={amount}
                    balanceNode={<>{`Balance: ${tokenBalance}`}</>}
                    maxNode={<div className="rounded-xl">max</div>}
                    onValueChange={(e) => {
                      setAmount(e.target.value)
                    }}
                  />
                  <SimpleInputBox title="AGLP Amount" value={""} />
                </StyledTabsContent>
                <StyledTabsContent
                  value={"sell"}
                  className="flex flex-col gap-5"
                >
                  <SimpleInputBox title="AGLP Amount" value={""} />
                  <TokenInputBox
                    title="Pay"
                    value={amount}
                    balanceNode={<>{`Balance: ${tokenBalance}`}</>}
                    maxNode={<div className="rounded-xl">max</div>}
                    onValueChange={(e) => {
                      setAmount(e.target.value)
                    }}
                  />
                </StyledTabsContent>
                <ListItem
                  keyText="Fees"
                  value={"0%"}
                  percentage={`${0}%`}
                  className="mt-2"
                />
                <Button
                  className="w-full h-[50px] mt-6 bg-agdexMain text-xl font-bold"
                  onClick={handleBuyLP}
                >
                  Pay
                </Button>
              </StyledTabs>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-2xl font-bold text-agdexMain">Pool Overview</div>

          <div className="flex flex-row justify-between p-5 ">
            <div className="w-[10%]">Token</div>
            <div className="w-[10%]">Price</div>
            <div className="w-1/5">Avaliable</div>
            <div className="w-1/5">Reserve</div>
            <div className="w-[15%]">Target Weight</div>
            <div className="w-[15%]">Current Weight</div>
            <div className="w-[10%]">Utilization</div>
          </div>
          <div className="border bg-0xline" />
          <div>
            {poolList.map((item, index) => (
              <div className="flex flex-row justify-between p-5 text-lg font-extrabold">
                <div className="w-[10%]">{item.token}</div>
                <div className="w-[10%]">{item.price}</div>
                <div className="w-[20%]">{item.available}</div>
                <div className="w-[20%]">{item.reserve}</div>
                <div className="w-[15%]">{item.targetWeight}</div>
                <div className="w-[15%]">{item.currentWeight}</div>
                <div className="w-[10%]">{item.utilization}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
