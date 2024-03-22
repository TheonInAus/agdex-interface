import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TokenPairWidget from "@/components/ui/tokenPair/TokenPairWidget"

export default function ABBridgeWidget() {
  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-col w-[500px]  gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div className="  font-bold">FROM</div>
            <div className="text-agdexMain">Connect wallet</div>
          </div>
          <div className="flex flex-row gap-3 p-3 mt-3 bg-0xgrey">
            <Card className="h-[200px] w-[200px] items-center justify-center flex ">
              Select network
            </Card>
            <div className="flex flex-col items-center justify-between w-[300px] h-[200px]">
              <Card className="w-full h-1/2">
                <div>Asset</div>
                <div>-</div>
              </Card>
              <div className="flex flex-row w-full gap-3 mt-2 h-1/2">
                <div className="flex flex-col items-start justify-center flex-1 h-full px-3 bg-card">
                  <div>Amount</div>
                  <div>-</div>
                </div>
                <div className="flex flex-col items-start justify-center flex-1 h-full px-2 text-agdexMain bg-muted">
                  <div>Balance</div>
                  <div>-</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="flex justify-center w-full font-bold">Switch</div>
        <Card>
          <div className="flex items-center justify-between">
            <div className="  font-bold">TO</div>
            <div className="text-agdexMain">Connect wallet</div>
          </div>
          <div className="flex flex-row gap-3 p-3 mt-3 bg-0xgrey">
            <Card className="h-[200px] w-[200px] items-center justify-center flex ">
              Select network
            </Card>
            <div className="flex flex-col items-center justify-between w-[300px] h-[200px]">
              <Card className="w-full h-1/2">
                <div>Asset</div>
                <div>-</div>
              </Card>
              <div className="flex flex-row w-full gap-3 mt-2 h-1/2">
                <div className="flex flex-col items-start justify-center flex-1 h-full px-3 bg-card">
                  <div>Amount</div>
                  <div>-</div>
                </div>
                <div className="flex flex-col items-start justify-center flex-1 h-full px-2 text-agdexMain bg-muted">
                  <div>Balance</div>
                  <div>-</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
