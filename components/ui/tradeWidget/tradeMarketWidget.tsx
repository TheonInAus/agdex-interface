import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  MOCK_USDC_COIN_STORE,
  formatAptosDecimal,
  generateFunctionPath,
  getAptosCoinBalance,
  getPositionConfigResources,
  getSideAddress,
  getVaultInfo,
  getVaultTokenBalance,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import useTokenStore from "@/chainio/useTokenStore"
import { aptos, moduleAddress } from "@/pages/_app"
import { APTOS_COIN } from "@aptos-labs/ts-sdk"
import { useWallet } from "@aptos-labs/wallet-adapter-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { ListItem } from "@/components/ui/listItem"
import { Slider } from "@/components/ui/slider"

import { Card } from "../card"
import { PoolInputBox } from "../poolInputBox"
import { TokenInputBox } from "../tokenInputBox"

type TradeMarketType = {
  side: string
  symbolPrice: number
  vaultPrice: number
}

export default function TradeMarketWidget({
  side,
  symbolPrice,
  vaultPrice,
}: TradeMarketType) {
  const [collateral, setCollateral] = useState("")
  const [openAmount, setOpenAmount] = useState("")
  const [leverageNumber, setLeverageNumber] = useState(1)

  const { symbol } = useTokenStore()

  const handleSliderValueChange = (value: any) => {
    setLeverageNumber(value[0])
  }

  useEffect(() => {
    if (
      collateral &&
      leverageNumber !== 0 &&
      vaultPrice !== 0 &&
      symbolPrice !== 0
    ) {
      setOpenAmount(
        (
          (Number(collateral) * vaultPrice * leverageNumber) /
          symbolPrice
        ).toString()
      )
    }
  }, [collateral, leverageNumber, symbolPrice, vaultPrice])

  const { vault } = useTokenStore()
  const { account, signAndSubmitTransaction } = useWallet()
  const [vaultBalance, setVaultBalance] = useState("0")
  const [estLiqPrice, setEstLiqPrice] = useState(0)

  const fetchBalance = async () => {
    try {
      const { result } = await getVaultTokenBalance(
        account?.address || "",
        vault
      )
      setVaultBalance(result)
    } catch (error) {
      setVaultBalance("0")
    }
  }
  useEffect(() => {
    if (account?.address) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.address, vault])

  const [wrapperConfig, setWrapperConfig] = useState<any>(null)
  const [tradingFee, setTradingFee] = useState(0)
  const [vaultInfo, setVaultInfo] = useState<any>(null)
  console.log("🚀 ~ vaultInfo:", vaultInfo)
  const fetchVaultInfo = async () => {
    try {
      let { result } = await getVaultInfo(vault.tokenAddress as APTOS_ADDRESS)
      setVaultInfo(result)
    } catch (error) {
      setVaultInfo(null)
    }
  }

  useEffect(() => {
    if (vault) {
      fetchVaultInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault])

  const fetchConfig = async () => {
    try {
      const result = await aptos.getAccountResource({
        accountAddress: moduleAddress,
        resourceType: getPositionConfigResources(
          symbol.tokenAddress as `${string}::${string}::${string}`,
          side
        ),
      })
      setWrapperConfig(result)
    } catch (error) {
      setWrapperConfig(null)
    }
  }
  useEffect(() => {
    if (side && symbol && vault) {
      fetchConfig()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side, symbol, vault])

  useEffect(() => {
    if (!wrapperConfig) return
    const open_bps = wrapperConfig.inner.open_fee_bps.value
    const dec_bps = wrapperConfig.inner.decrease_fee_bps.value
    if (!collateral || !openAmount) {
      return
    }
    if (side === "LONG") {
      setTradingFee(
        Number(openAmount) * symbolPrice * parseAptosDecimal(open_bps, 18)
      )
    } else {
      setTradingFee(
        Number(openAmount) * symbolPrice * parseAptosDecimal(dec_bps, 18)
      )
    }
  }, [wrapperConfig, openAmount, side, collateral, symbolPrice])

  useEffect(() => {
    if (symbolPrice && collateral) {
      let liqPrice = 0
      //liqprice = symbol price -  (collateral * price - tradingfee)/leverage
      if (side === "LONG") {
        liqPrice =
          symbolPrice -
          (Number(collateral) * vaultPrice - tradingFee) /
            leverageNumber /
            Number(openAmount)
      } else {
        liqPrice =
          symbolPrice +
          (Number(collateral) * vaultPrice - tradingFee) /
            leverageNumber /
            Number(openAmount)
      }
      setEstLiqPrice(liqPrice)
    }
  }, [
    collateral,
    leverageNumber,
    openAmount,
    side,
    symbolPrice,
    tradingFee,
    vaultPrice,
  ])

  const handleOpenPosition = async () => {
    const response = await signAndSubmitTransaction({
      sender: account?.address,
      data: {
        function: generateFunctionPath(
          moduleAddress,
          "market",
          "open_position"
        ),
        typeArguments: [
          vault.tokenAddress,
          symbol.tokenAddress,
          getSideAddress(side),
          APTOS_COIN,
        ],
        functionArguments: [
          1,
          formatAptosDecimal(Number(openAmount), vault.decimal), //open_amount
          formatAptosDecimal(Number(openAmount), vault.decimal), //reserve_amount
          formatAptosDecimal(Number(collateral), vault.decimal), //collateral
          10, //fee_amount
          formatAptosDecimal(Number(vaultPrice * (1 - 0.01)), 18), //collateral_price_threshold
          side === "LONG"
            ? formatAptosDecimal(Number(symbolPrice * (1 + 0.01)), 18)
            : formatAptosDecimal(Number(symbolPrice * (1 - 0.01)), 18), //limited_index_price
          [],
        ],
      },
    })
    try {
      const temp = await aptos.waitForTransaction({
        transactionHash: response.hash,
      })
      console.log("🚀 ~ trading handleOpenPosition ~ temp:", temp)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <TokenInputBox
        title={`Pay`}
        subTitle={`$${(Number(collateral) * vaultPrice).toFixed(6)}`}
        value={collateral}
        balanceNode={<span>{`Balance: ${vaultBalance}`}</span>}
        maxNode={<div className="rounded-xl">max</div>}
        onValueChange={(e) => {
          setCollateral(e.target.value)
        }}
      />
      <br></br>
      <PoolInputBox
        title={side}
        subTitle={`$${(Number(openAmount) * symbolPrice - tradingFee).toFixed(
          6
        )}`}
        value={openAmount}
        prefix={`Leverage:`}
        prefixValue={leverageNumber}
        onValueChange={(e) => {
          setOpenAmount(e.target.value)
        }}
        onPrefixChange={(e) => {
          const intValue = parseInt(e.target.value, 10)
          if (!isNaN(intValue)) {
            setLeverageNumber(intValue)
          } else if (intValue < 1) {
            setLeverageNumber(1)
          } else if (intValue > 100) {
            setLeverageNumber(100)
          } else {
            setLeverageNumber(1)
          }
        }}
      />
      <br></br>
      <div>
        <Slider
          defaultValue={[1]}
          onValueChange={handleSliderValueChange}
          max={100}
          min={1}
          step={1}
          value={[leverageNumber]}
          style={{ marginBottom: 10, marginTop: 10 }}
        />
      </div>
      <br></br>
      <div className="py-2">
        <ListItem keyText="Collateral In" value={vault.name} />
        <ListItem keyText="Leverage" value={leverageNumber} />
        <ListItem
          className="underline"
          keyText="Avail. Reserve"
          value={`${Number(collateral) * leverageNumber}/${parseAptosDecimal(
            Number(vaultInfo?.liquidity.value),
            vault.decimal
          ).toFixed(6)} ${vault.name}`}
        />
        <ListItem
          keyText="Reserving Fee Bate"
          className="underline"
          value={`${(
            100 *
            parseAptosDecimal(Number(vaultInfo?.acc_reserving_rate.value), 18)
          ).toFixed(6)}%`}
        />
        <ListItem keyText="Entry Price" value={Number(symbolPrice)} />
        <ListItem keyText="Est. Liq. Price" value={estLiqPrice.toFixed(6)} />
        <ListItem
          keyText="Fee"
          value={`${(tradingFee * vaultPrice).toFixed(
            2
          )} USD (${tradingFee.toFixed(6)}) ${vault.name}`}
        />
      </div>
      {/* <ListItem
          keyText="HasReferral?"
          value={referralState ? "YES" : "NO"}
        ></ListItem> */}
      <Button
        disabled={false}
        onClick={handleOpenPosition}
        className={`w-full font-bold text-center rounded-md item-center mt-4 ${"bg-0xgreen hover:bg-0xgreen-foreground"} h-9 text-white`}
      >
        {"Long"}
      </Button>
    </div>
  )
}
