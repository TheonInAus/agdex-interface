import { useContractRead, useContractWrite, useWalletClient } from "wagmi"
import { routerABI } from "@/abis/routerABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';
import { positionRouterAddress, routerAddress } from "./zAddressHelper";
import { arbitrumGoerli } from "viem/chains";

export const useApprovePlugin = (pluginAddress: any) => {
    const { data: approvePluginData, isLoading: approvePluginLoading, write: approvePluginWrite } = useContractWrite({
        address: routerAddress,
        abi: routerABI,
        functionName: 'approvePlugin',
        args: [pluginAddress]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (approvePluginData?.hash && approvePluginData.hash !== previousHashRef.current) {
            (async () => {
                if (approvePluginData?.hash) {
                    const receipt = await waitForTransaction({ hash: approvePluginData?.hash });
                    previousHashRef.current = approvePluginData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [approvePluginData]);

    return {
        approvePluginData,
        approvePluginLoading,
        approvePluginWrite
    }
}

export const useCheckPluginState = (pluginAddress: any) => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })

    const { data, isLoading, isError } = useContractRead({
        address: routerAddress,
        functionName: 'isPluginApproved',
        abi: routerABI,
        args: [walletClient?.account.address, pluginAddress],
        watch: true
    })
    return {
        data,
        isLoading,
        isError
    }
}