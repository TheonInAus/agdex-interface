import { useBalance, useContractRead } from "wagmi"
import { ethPoolAddress, usdxAddress } from "./zAddressHelper"
import { useWalletClient } from 'wagmi'
import { arbitrumGoerli } from 'wagmi/chains'
import { poolABI } from "@/abis/poolABI"
import { SIDE_LONG, SIDE_SHORT } from "./zContractHelper"

export const useUserUsdxBalance = () => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    const { data, isError, isLoading } = useBalance({
        address: walletClient?.account.address,
        token: usdxAddress
    })

    return { data, isError, isLoading }
}

export const useUserPositionsLONG = () => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    const { data, isLoading, isError } = useContractRead({
        address: ethPoolAddress,
        abi: poolABI,
        functionName: 'positions',
        args: [walletClient?.account.address, SIDE_LONG]
    })

    return { data, isLoading, isError }
}

export const useUserPositionsSHORT = () => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    const { data, isLoading, isError } = useContractRead({
        address: ethPoolAddress,
        abi: poolABI,
        functionName: 'positions',
        args: [walletClient?.account.address, SIDE_SHORT]
    })

    return { data, isLoading, isError }
}