import { useContractWrite } from "wagmi"
import { positionRouterABI } from "@/abis/positionRouterABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';
import { positionRouterAddress } from "./zAddressHelper";
import { minExecutionFee } from "./zContractHelper";
import { parseUnits } from "viem";

export const useOpenLiquidityPosition = (market: any, margin: any, liquidity: any, acceptableMinMargin: any) => {
    if (margin === '') margin = '0'
    if (liquidity === '') liquidity = '0'
    margin = parseUnits(margin, 6)
    liquidity = parseUnits(liquidity, 6)
    console.log("🚀 ~ useOpenLiquidityPosition ~ market:", market)

    const { data: openLiqPositionData, isLoading: openLiqPositionLoading, write: openLiqPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createIncreaseLiquidityPosition',
        args: [market, margin, liquidity, acceptableMinMargin],//@TODO 
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