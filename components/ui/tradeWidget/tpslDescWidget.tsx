"use client"

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
            positionItem?.tokenSide === "Long" ? "text-0xgreen" : "text-0xred"
          } text-sm mt-[2px]`}
        >
          {positionItem?.tokenSide}{" "}
          {(positionItem?.margin, positionItem?.size, 2000n)}x
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row">
            <span>Entry Price: </span>
            <span className="ml-2">xxx</span>
          </div>

          <div className="flex flex-row">
            <span>Market Price: </span>
            <span className="ml-2">yyy</span>
          </div>
        </div>

        <div className="flex flex-row mt-1">
          <span>Liq.Price: </span>
          <span className="ml-2">zzz</span>
        </div>
      </div>
      <div className="mt-3 border-t border-0xline"></div>
    </>
  )
}
