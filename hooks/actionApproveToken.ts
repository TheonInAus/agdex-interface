import { usdxABI } from "@/abis/usdxABI";
import { positionRouterAddress, usdxAddress } from "./zAddressHelper";
import { waitForTransaction } from "wagmi/dist/actions";
import { useEffect, useRef } from "react";
import { MaxInt256 } from "ethers";
import { useContractWrite } from "wagmi";

export const useApproveToken = () => {
    const { data: approveData, isLoading: approveLoading, write: approveWrite } = useContractWrite({
        address: usdxAddress,
        abi: usdxABI,
        functionName: 'approve',
        args: [positionRouterAddress, MaxInt256]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (approveData?.hash && approveData.hash !== previousHashRef.current) {
            (async () => {
                if (approveData?.hash) {
                    const receipt = await waitForTransaction({ hash: approveData?.hash });
                    previousHashRef.current = approveData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [approveData]);

    return {
        approveData,
        approveLoading,
        approveWrite
    }
}
