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

type BuyLpWidgetProps = {}

export default function BuyLpWidget({}: BuyLpWidgetProps) {
  const { symbol, vault } = useTokenStore()
  const { account, signAndSubmitTransaction } = useWallet()
  const [tokenBalance, setTokenBalance] = useState("0")
  const [lpBalance, setLpBalance] = useState("0")
  const [amount, setAmount] = useState("")
  const [lpOut, setLpOut] = useState("0")
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

  const handleLpAmountOut = async (colAmount: number) => {
    try {
      const result = await aptos.view({
        payload: {
          function: `${moduleAddress}::market::to_lp_amount`,
          typeArguments: [vault.tokenAddress],
          functionArguments: [formatAptosDecimal(colAmount, vault.decimal)],
        },
      })
      setLpOut(
        parseAptosDecimal(
          (Number(result[0]) * 99) / 100,
          LpToken.decimal
        ).toFixed(6)
      )
    } catch (error) {}
  }

  const handleBuyLP = async () => {
    const response = await signAndSubmitTransaction({
      sender: account?.address,
      data: {
        function: generateFunctionPath(moduleAddress, "market", "deposit"),
        typeArguments: [vault.tokenAddress],
        functionArguments: [
          formatAptosDecimal(Number(amount), vault.decimal),
          formatAptosDecimal(Number(lpOut), LpToken.decimal),
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
        handleLpAmountOut(Number(amount))
      }, 1000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, vault])

  return (
    <div className="flex flex-col gap-2">
      <TokenInputBox
        title="Pay"
        value={amount}
        balanceNode={<>{`Balance: ${tokenBalance}`}</>}
        maxNode={<div className="rounded-xl">max</div>}
        onMaxClick={() => {
          if (tokenBalance) {
            setAmount(tokenBalance)
          }
        }}
        onValueChange={(e) => {
          setAmount(e.target.value)
        }}
      />
      <SimpleInputBox
        title="AGLP"
        value={lpOut}
        balanceNode={<>{`Balance: ${lpBalance}`}</>}
        onValueChange={(e) => {
          setLpOut(e.target.value)
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
        onClick={handleBuyLP}
      >
        Pay
      </Button>
    </div>
  )
}
