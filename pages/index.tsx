import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function IndexPage() {
  const router = useRouter()
  const handleTradeNowClick = () => {
    // Navigate to the trade page
    router.push("/trade") // Use the path to your trade page
  }

  return (
    <section className="grid items-center">
      <div
        className=" h-[750px] rounded-b-[70px]"
        style={{
          backgroundImage:
            "linear-gradient(to top, #AA390C 5%, #E96E27 95%)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <div className="mt-64">
          <div className="items-center justify-center font-extrabold text-center text-black text-7xl">
            Next-Gen Decentralized Trading
          </div>
          <div className="items-center justify-center mt-2 text-base font-semibold text-center text-black">
            Up to 200x leverage and 0 trading fees No sign up or deposit
            required
          </div>
          <div className="flex justify-center">
            <Button
              className="justify-center mt-5 text-base font-semibold bg-black rounded-lg text-agdexMain hover:bg-slate-900"
              onClick={handleTradeNowClick}
            >
              Trade Now
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-10 mt-28">
        <div className="w-[400px] mt-40">
          <div className="text-base text-white">Small title</div>
          <div className="mt-1 text-4xl text-white">Main title</div>
          <div className="mt-2 text-base text-0xgrey">
            Permissionless, non-custodial, and non-KYC DEX delivering
            cross-margined perpetual contracts with multi-chain support, up to
            30x leverage and instant settlement.
          </div>
          <Button
            className="mt-3 text-base text-black bg-agdexMain rounded-xl"
            onClick={handleTradeNowClick}
          >
            Launch App
          </Button>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="bg-0xbox rounded-lg w-[700px] h-[100px] flex gap-5 ">
            <div className="mt-10 ml-10">Icon</div>
            <div>
              <div className="mt-5 ml-5 text-base text-white">Title</div>
              <div className="mt-2 ml-5 text-sm text-0xgrey">Text</div>
            </div>
          </div>
          <div className="bg-0xbox rounded-lg w-[700px] h-[100px] flex gap-5 ">
            <div className="mt-10 ml-10">Icon</div>
            <div>
              <div className="mt-5 ml-5 text-base text-white">Title</div>
              <div className="mt-2 ml-5 text-sm text-0xgrey">Text</div>
            </div>
          </div>
          <div className="bg-0xbox rounded-lg w-[700px] h-[100px] flex gap-5 ">
            <div className="mt-10 ml-10">Icon</div>
            <div>
              <div className="mt-5 ml-5 text-base text-white">Title</div>
              <div className="mt-2 ml-5 text-sm text-0xgrey">Text</div>
            </div>
          </div>
          <div className="bg-0xbox rounded-lg w-[700px] h-[100px] flex gap-5 ">
            <div className="mt-10 ml-10">Icon</div>
            <div>
              <div className="mt-5 ml-5 text-base text-white">Title</div>
              <div className="mt-2 ml-5 text-sm text-0xgrey">Text</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-40">
        <div className="h-[170px] w-[1137px] bg-0xbox flex justify-center items-center gap-2 rounded-lg">
          <div className="ml-14">
            <Image src="/agLogo.svg" alt="Logo" width={150} height={150} />
          </div>
          <div className="mx-10">
            <div className="text-lg text-white">Fair Launch</div>
            <div className="text-base text-0xgrey">
              EQU is the native token of Equation, with a maximum supply of 10
              million, 100% of which is generated through position mining,
              liquidity mining and referral mining, rewarded to community users.
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-40">
        <div className="text-5xl font-semibold text-agdexMain">The Roadmap</div>
        <div className="h-[500px]"></div>
      </div>
    </section>
  )
}
