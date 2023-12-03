import { parseEther } from 'viem';
import { useContractWrite, useWalletClient } from "wagmi"
import { positionRouterABI } from "@/abis/positionRouterABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';
import { positionRouterAddress } from "./zAddressHelper";
import { Side, minExecutionFee, wrapperParseEther6e } from "./zContractHelper";
import { arbitrumGoerli } from 'viem/chains';

export const useCreateIncreasePostion = (tokenPoolAddress: any, side: Side, marginDelta: any, sizeDelta: any, acceptableTradePriceX96: any) => {

    const { data: incPositionData, isLoading: incPositionLoading, write: incPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createIncreasePosition',
        args: [tokenPoolAddress, side, wrapperParseEther6e(marginDelta), parseEther(sizeDelta), acceptableTradePriceX96],
        value: minExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (incPositionData?.hash && incPositionData.hash !== previousHashRef.current) {
            (async () => {
                if (incPositionData?.hash) {
                    const receipt = await waitForTransaction({ hash: incPositionData?.hash });
                    previousHashRef.current = incPositionData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [incPositionData]);

    return {
        incPositionData,
        incPositionLoading,
        incPositionWrite
    }

}

export const useCreateDecreasePosition = (tokenPoolAddress: any, side: Side, marginDelta: any, sizeDelta: any, acceptableTradePriceX96: any, receiverAddress: any) => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    console.log('check decrease position params => ', tokenPoolAddress, side, marginDelta, sizeDelta, acceptableTradePriceX96)
    if (receiverAddress === '') receiverAddress = walletClient?.account.address
    const { data: decPositionData, isLoading: decPositionLoading, write: decPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createDecreasePosition',
        args: [tokenPoolAddress, side, marginDelta, sizeDelta, acceptableTradePriceX96, receiverAddress],
        value: minExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (decPositionData?.hash && decPositionData.hash !== previousHashRef.current) {
            (async () => {
                if (decPositionData?.hash) {
                    const receipt = await waitForTransaction({ hash: decPositionData?.hash });
                    previousHashRef.current = decPositionData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [decPositionData]);

    return {
        decPositionData,
        decPositionLoading,
        decPositionWrite
    }

}
