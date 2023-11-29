import { useContractWrite } from "wagmi"
import { positionRouterABI } from "@/abis/positionRouterABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';
import { positionRouterAddress } from "./zAddressHelper";
import { minExecutionFee } from "./zContractConstantsHelper";

export const useOpenLiquidityPosition = (tokenPoolAddress: any, margin: any, liquidity: any) => {

    const { data: openLiqPositionData, isLoading: openLiqPositionLoading, write: openLiqPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createOpenLiquidityPosition',
        args: [tokenPoolAddress, margin, liquidity],
        value: minExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (openLiqPositionData?.hash && openLiqPositionData.hash !== previousHashRef.current) {
            (async () => {
                if (openLiqPositionData?.hash) {
                    const receipt = await waitForTransaction({ hash: openLiqPositionData?.hash });
                    previousHashRef.current = openLiqPositionData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [openLiqPositionData]);

    return {
        openLiqPositionData,
        openLiqPositionLoading,
        openLiqPositionWrite
    }

}


export const useCancelLiqPosition = (index: any, receiverAddress: any) => {
    const { data: cancelLiqPositionData, isLoading: cancelLiqPositionLoading, write: cancelLiqPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'cancelOpenLiquidityPosition',
        args: [index, receiverAddress],
        value: minExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (cancelLiqPositionData?.hash && cancelLiqPositionData.hash !== previousHashRef.current) {
            (async () => {
                if (cancelLiqPositionData?.hash) {
                    const receipt = await waitForTransaction({ hash: cancelLiqPositionData?.hash });
                    previousHashRef.current = cancelLiqPositionData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [cancelLiqPositionData]);

    return {
        cancelLiqPositionData,
        cancelLiqPositionLoading,
        cancelLiqPositionWrite
    }

}

export const useAdjustLiqPosition = (tokenPoolAddress: any, positionID: any, marginDelta: any, receiverAddress: any) => {
    const { data: adjustPositionData, isLoading: adjustLiqPositionLoading, write: adjustLiqPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createAdjustLiquidityPositionMargin',
        args: [tokenPoolAddress, positionID, marginDelta, receiverAddress],
        value: minExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (adjustPositionData?.hash && adjustPositionData.hash !== previousHashRef.current) {
            (async () => {
                if (adjustPositionData?.hash) {
                    const receipt = await waitForTransaction({ hash: adjustPositionData?.hash });
                    previousHashRef.current = adjustPositionData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [adjustPositionData]);

    return {
        adjustPositionData,
        adjustLiqPositionLoading,
        adjustLiqPositionWrite
    }

}