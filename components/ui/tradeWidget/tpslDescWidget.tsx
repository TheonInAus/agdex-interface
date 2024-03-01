"use client"

import {
  e6DivideE18,
  giveMeFormattedToShow,
  x96Price2Readable,
} from "@/hooks/zContractHelper"

type TpslDescProps = {
  positionItem?: any
}

export default function TpslDescWidget({ positionItem }: TpslDescProps) {
  return (
    <>
      <div className="flex flex-row gap-2 mb-3">
        <div className="text-base text-white">{`${positionItem?.tokenName}/USDX`}</div>
        <div
          className={`${
            positionItem?.tokenSide === "Long"
              ? "text-0xgreen"
              : "text-0xredLighter"
          } text-sm mt-[2px]`}
        >
          {positionItem?.tokenSide}{" "}
          {e6DivideE18(positionItem?.margin, positionItem?.size, 2000n)}x
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row">
            <span>Entry Price: </span>
            <span className="ml-2">
              {giveMeFormattedToShow(
                Number(x96Price2Readable(positionItem?.entryPriceX96))
              )}
            </span>
          </div>

          <div className="flex flex-row">
            <span>Market Price: </span>
            <span className="ml-2">
              {giveMeFormattedToShow(
                Number(x96Price2Readable(positionItem?.entryPriceX96))
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-row mt-1">
          <span>Liq.Price: </span>
          <span className="ml-2">
            {giveMeFormattedToShow(
              Number(x96Price2Readable(positionItem?.entryPriceX96))
            )}
          </span>
        </div>
      </div>
      <div className="mt-3 border-t border-0xline"></div>
    </>
  )
}
