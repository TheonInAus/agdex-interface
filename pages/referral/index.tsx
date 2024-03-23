import Iconify from "@/components/Iconify"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TokenPairWidget from "@/components/ui/tokenPair/TokenPairWidget"

export default function AbRefferalsWidget() {
  return (
    <section className="container flex items-center justify-center gap-6 pt-6 pb-8">
      <div className="flex flex-col w-full gap-4">
        <Card className="p-5">
          <div className="flex flex-row items-center justify-start gap-10">
            <TokenPairWidget token1="ETH" token2="BTC" />
            <div className="text-2xl   font-bold">PrePx Referrals</div>
          </div>
        </Card>
        <div className="w-full text-base flex justify-center items-center bg-0xbox">
        <Iconify icon="iconoir:light-bulb-on" />
        <div className="font-bold">Earn rebates (20% of the trading fee) through the ABEx referral
          program. For more information, please read the</div>
          <a href="google.com" className="text-blue-500 underline ml-1">
            referral program details.
          </a>
        </div>
        <Card>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col items-start w-1/2 p-3">
              <div className="text-xl   font-bold text-agdexMain">
                Your Referral Link
              </div>
              <input
                className="w-full px-5 py-2 mt-5 bg-0xbox"
                placeholder="http://"
                value={
                  "http://prepx.fi/app/trade?referral=0x1234567788....22443"
                }
              />

              <Button className="w-full mt-5 font-bold bg-agdexMain">
                {" "}
                Copy Referral Link
              </Button>
            </div>
            <div className="border border-0xline" />
            <div className="w-1/2 p-5">
              <div className="flex flex-row justify-between h-full border border-0xline">
                <div className="flex flex-col items-center justify-between px-10 py-4">
                  <div className="font-bold">Trading Volume</div>
                  <div className="text-lg font-extrabold text-white">$0</div>
                  <div className="text-xs font-medium">
                    Volume traded by this account with
                  </div>
                  <div className="text-xs font-medium">
                    the referral address.
                  </div>
                </div>
                <div className="my-5 border border-0xline"></div>
                <div className="flex flex-col items-center justify-between px-10 py-4">
                  <div className="  font-bold">Trading Volume</div>
                  <div className="text-lg font-extrabold text-white">$0</div>
                  <div className="text-xs   font-medium">
                    Rebates earned by this account as
                  </div>
                  <div className="text-xs   font-medium">a trader.</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="mb-10 text-xl font-bold">My Invites(0)</div>
          </div>
          <div className="flex justify-center">
            <div className="mb-10 text-base">No invites yet</div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex flex-row items-center justify-center gap-10">
            <div className="text-sm">No rebates distribution history yet.</div>
          </div>
        </Card>
      </div>
    </section>
  )
}
