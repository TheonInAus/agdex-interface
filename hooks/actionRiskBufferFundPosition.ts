import { useContractWrite } from "wagmi"
import { positionRouterABI } from "@/abis/positionRouterABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';
import { positionRouterAddress } from "./zAddressHelper";
import { minExecutionFee } from "./zContractConstantsHelper";


export const useRiskBufferFundPosition = (tokenPoolAddress: any, liquidityDelta: any) => {

    const { data: increaseRBFPositionData, isLoading: increaseRBFPositionLoading, write: increaseRBFPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createIncreaseRiskBufferFundPosition',
        args: [tokenPoolAddress, liquidityDelta],
        value: minExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (increaseRBFPositionData?.hash && increaseRBFPositionData.hash !== previousHashRef.current) {
            (async () => {
                if (increaseRBFPositionData?.hash) {
                    const receipt = await waitForTransaction({ hash: increaseRBFPositionData?.hash });
                    previousHashRef.current = increaseRBFPositionData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [increaseRBFPositionData]);

    return {
        increaseRBFPositionData,
        increaseRBFPositionLoading,
        increaseRBFPositionWrite
    }
}


export const useDecreaseRBFPosition = (tokenPoolAddress: any, liquidityDelta: any, receiverAddress: any) => {

    const { data: decreaseRBFPositionData, isLoading: decreaseRBFPositionLoading, write: decreaseRBFPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createDecreaseRiskBufferFundPosition',
        args: [tokenPoolAddress, liquidityDelta, receiverAddress],
        value: minExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (decreaseRBFPositionData?.hash && decreaseRBFPositionData.hash !== previousHashRef.current) {
            (async () => {
                if (decreaseRBFPositionData?.hash) {
                    const receipt = await waitForTransaction({ hash: decreaseRBFPositionData?.hash });
                    previousHashRef.current = decreaseRBFPositionData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [decreaseRBFPositionData]);

    return {
        decreaseRBFPositionData,
        decreaseRBFPositionLoading,
        decreaseRBFPositionWrite
    }
}

