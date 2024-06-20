import { useEffect, useRef, useState } from "react"
import {
  APTOS_ADDRESS,
  formatAptosDecimal,
  generateFunctionPath,
  getAptosCoinBalance,
  getVaultTokenBalance,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import { LpToken } from "@/chainio/helper"
import useTokenStore from "@/chainio/useTokenStore"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Button } from "@/components/ui/button"
import { ListItem } from "@/components/ui/listItem"
import { SimpleInputBox } from "@/components/ui/simpleInputBox"
import { TokenInputBox } from "@/components/ui/tokenInputBox"

import { aptos, moduleAddress } from "../_app"

type SellLpWidgetProps = {}

export default function SellLpWidget({}: SellLpWidgetProps) {
  const { symbol, vault } = useTokenStore()
  const { account, signAndSubmitTransaction } = useWallet()
  const [lpBalance, setLpBalance] = useState("0")
  const [tokenBalance, setTokenBalance] = useState("0")
  const [amount, setAmount] = useState("")
  const [collateralOut, setCollateralOut] = useState("0")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fetchBalance = async () => {
    try {
      const { result } = await getVaultTokenBalance(
        account?.address || "",
        vault
      )
      setTokenBalance(result)
    } catch (error) {
      setTokenBalance("0")
    }
  }

  const fetchLpBalance = async () => {
    try {
      const { result } = await getVaultTokenBalance(
        account?.address || "",
        LpToken
      )
      setLpBalance(result)
    } catch (error) {
      setLpBalance("0")
    }
  }

  const handleCollateralAmountOut = async (lpAmount: number) => {
    const result = await aptos.view({
      payload: {
        function: `${moduleAddress}::market::to_collateral_amount`,
        typeArguments: [vault.tokenAddress],
        functionArguments: [formatAptosDecimal(lpAmount, LpToken.decimal)],
      },
    })
    console.log("🚀 ~ handleCollateralAmountOut ~ result:", result)
    if (result && result.length > 0) {
      setCollateralOut(
        parseAptosDecimal(Number(result[0]), vault.decimal).toFixed(6)
      )
    }
  }

  const handleSellLp = async () => {
    const response = await signAndSubmitTransaction({
      sender: account?.address,
      data: {
        function: generateFunctionPath(moduleAddress, "market", "withdraw"),
        typeArguments: [vault.tokenAddress],
        functionArguments: [
          formatAptosDecimal(Number(amount), LpToken.decimal),
          formatAptosDecimal(Number(collateralOut), vault.decimal),
          [],
        ],
      },
    })
    try {
      await aptos.waitForTransaction({ transactionHash: response.hash })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account?.address) {
      fetchBalance()
      fetchLpBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, vault])

  useEffect(() => {
    if (amount) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        handleCollateralAmountOut(Number(amount))
      }, 1000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, vault])

  return (
    <div className="flex flex-col gap-2">
      <SimpleInputBox
        title="AGLP"
        value={amount}
        balanceNode={<>{`Balance: ${lpBalance}`}</>}
        maxNode={<div className="rounded-xl">max</div>}
        onMaxClick={() => {
          if (lpBalance) {
            setAmount(lpBalance)
          }
        }}
        onValueChange={(e) => {
          setAmount(e.target.value)
        }}
      />
      <TokenInputBox
        title="Pay"
        value={collateralOut}
        balanceNode={<>{`Balance: ${tokenBalance}`}</>}
        onValueChange={(e) => {
          setCollateralOut(e.target.value)
        }}
      />

      <ListItem
        keyText="Fees"
        value={"-%"}
        percentage={`-%`}
        className="mt-2"
      />
      <Button
        className="w-full h-[50px] mt-4 bg-agdexMain text-xl font-bold"
        onClick={handleSellLp}
      >
        Sell
      </Button>
    </div>
  )
}
