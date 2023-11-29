import { useContractWrite } from "wagmi"
import { routerABI } from "@/abis/routerABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';
import { positionRouterAddress, routerAddress } from "./zAddressHelper";

export const useApprovePlugin = () => {

    const { data: approvePluginData, isLoading: approvePluginLoading, write: approvePluginWrite } = useContractWrite({
        address: routerAddress,
        abi: routerABI,
        functionName: 'approvePlugin',
        args: [positionRouterAddress]
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