import { useEffect, useState } from "react"
import {
  APTOS_ADDRESS,
  getVaultInfo,
  parseAptosDecimal,
} from "@/chainio/fetchData"
import { VaultInfo } from "@/chainio/helper"
import { PriceResultType } from "@/chainio/usePriceData"
import { enqueueSnackbar } from "notistack"

export type VaultItemWidgetProps = {
  vaultInfo: VaultInfo
  priceDatas: PriceResultType[]
}

export default function VaultItemWidget({
  vaultInfo,
  priceDatas,
}: VaultItemWidgetProps) {
  const [vaultResult, setVaultResult] = useState<any>(null)
  const [vaultPrice, setVaultPrice] = useState<number>(0)

  useEffect(() => {
    if (priceDatas && priceDatas.length > 0) {
      const vaultData = priceDatas.find(
        (item) => item.tokenName === vaultInfo?.name
      ) as unknown as PriceResultType

      setVaultPrice(vaultData.price)
    }
  }, [priceDatas, vaultInfo])

  const fetchVaultInfo = async () => {
    try {
      const { result } = await getVaultInfo(
        vaultInfo?.tokenAddress as APTOS_ADDRESS
      )
      setVaultResult(result)
    } catch (error: any) {
      enqueueSnackbar(error.toString(), { variant: "error" })
    }
  }

  useEffect(() => {
    if (vaultInfo?.tokenAddress) {
      fetchVaultInfo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaultInfo])
  return (
    <div className="flex flex-row justify-between p-5 text-lg font-extrabold">
      <div className="w-[10%]">{vaultInfo?.name}</div>
      <div className="w-[10%]">{`$${vaultPrice}`}</div>
      <div className="w-[15%] text-right">
        {parseAptosDecimal(
          Number(vaultResult?.liquidity.value),
          vaultInfo?.decimal
        )}
      </div>
      <div className="w-[15%] text-right">
        {parseAptosDecimal(
          Number(vaultResult?.reserved_amount),
          vaultInfo?.decimal
        )}
      </div>
      <div className="w-[15%] text-right">{"-"}</div>
      <div className="w-1/5 text-right">
        {`${parseAptosDecimal(Number(vaultResult?.weight.value), 18) * 100}%`}
      </div>
      <div className="w-1/5 text-right">{`${(
        (parseAptosDecimal(
          Number(vaultResult?.reserved_amount),
          vaultInfo?.decimal
        ) /
          parseAptosDecimal(
            Number(vaultResult?.liquidity.value),
            vaultInfo?.decimal
          )) *
        100
      ).toFixed(2)}%`}</div>
    </div>
  )
}
