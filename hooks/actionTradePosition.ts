import { parseEther } from 'viem';
import { useContractWrite, useWalletClient } from "wagmi"
import { positionRouterABI } from "@/abis/positionRouterABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';
import { orderBookAddress, positionRouterAddress } from "./zAddressHelper";
import { Side, minExecutionFee, wrapperParseEther6e, minOrderBookExecutionFee } from "./zContractHelper";
import { arbitrumGoerli } from 'viem/chains';
import { orderBookABI } from '@/abis/orderBookABI';

export const useCreateIncreasePostion = (marketAddress: any, side: Side, marginDelta: any, sizeDelta: any, acceptableTradePriceX96: any) => {
    const { data: incPositionData, isLoading: incPositionLoading, write: incPositionWrite, error } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createIncreasePosition',
        args: [marketAddress, side, wrapperParseEther6e(marginDelta), parseEther(sizeDelta), acceptableTradePriceX96],
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

export const useCreateDecreasePosition = (marketAddress: any, side: Side, marginDelta: any, sizeDelta: any, acceptableTradePriceX96: any, receiverAddress: any) => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    if (!marginDelta) marginDelta = '0'
    if (!sizeDelta) sizeDelta = '0'
    if (receiverAddress === '') receiverAddress = walletClient?.account.address
    const { data: decPositionData, isLoading: decPositionLoading, write: decPositionWrite } = useContractWrite({
        address: positionRouterAddress,
        abi: positionRouterABI,
        functionName: 'createDecreasePosition',
        args: [marketAddress, side, wrapperParseEther6e(marginDelta), BigInt(sizeDelta), acceptableTradePriceX96, receiverAddress],
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

export const useCreateIncreaseOrder = (tokenPoolAddress: any, side: Side, marginDelta: any, sizeDelta: any, triggerMarketPriceX96: any, triggerAbove: any, acceptableTradePriceX96: any) => {

    const { data: createIncOrderData, isLoading: isCreateIncOrderLoading, isError: isCreateIncOrderError, write: createIncOrderWrite } = useContractWrite({
        address: orderBookAddress,
        abi: orderBookABI,
        functionName: 'createIncreaseOrder',
        args: [tokenPoolAddress, side, wrapperParseEther6e(marginDelta), parseEther(sizeDelta), triggerMarketPriceX96, triggerAbove, acceptableTradePriceX96],
        value: minOrderBookExecutionFee
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (createIncOrderData?.hash && createIncOrderData.hash !== previousHashRef.current) {
            (async () => {
                if (createIncOrderData?.hash) {
                    const receipt = await waitForTransaction({ hash: createIncOrderData?.hash });
                    previousHashRef.current = createIncOrderData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [createIncOrderData]);

    return {
        createIncOrderData,
        isCreateIncOrderLoading,
        isCreateIncOrderError,
        createIncOrderWrite
    }
}


export const useUpdateIncreaseOrder = (orderIndex: any, triggerMarketPriceX96: any, acceptableTradePriceX96: any) => {

    const { data: updateIncOrderData, isLoading: isUpdateIncOrderLoading, isError: isUpdateIncOrderError, write: updateIncOrderWrite } = useContractWrite({
        address: orderBookAddress,
        abi: orderBookABI,
        functionName: 'updateIncreaseOrder',
        args: [orderIndex, triggerMarketPriceX96, acceptableTradePriceX96]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (updateIncOrderData?.hash && updateIncOrderData.hash !== previousHashRef.current) {
            (async () => {
                if (updateIncOrderData?.hash) {
                    const receipt = await waitForTransaction({ hash: updateIncOrderData?.hash });
                    previousHashRef.current = updateIncOrderData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [updateIncOrderData]);

    return {
        updateIncOrderData,
        isUpdateIncOrderLoading,
        isUpdateIncOrderError,
        updateIncOrderWrite
    }
}


export const useCancelIncreaseOrder = (orderIndex: any, receiverAddress: any) => {
    const { data: cancelIncOrderData, isLoading: isCancelIncOrderLoading, isError: isCancelIncOrderError, write: cancelIncOrderWrite } = useContractWrite({
        address: orderBookAddress,
        abi: orderBookABI,
        functionName: 'cancelIncreaseOrder',
        args: [orderIndex, receiverAddress]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (cancelIncOrderData?.hash && cancelIncOrderData.hash !== previousHashRef.current) {
            (async () => {
                if (cancelIncOrderData?.hash) {
                    const receipt = await waitForTransaction({ hash: cancelIncOrderData?.hash });
                    previousHashRef.current = cancelIncOrderData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [cancelIncOrderData]);

    return {
        cancelIncOrderData,
        isCancelIncOrderLoading,
        isCancelIncOrderError,
        cancelIncOrderWrite
    }
}

export const useCreateDecreaseOrder = (tokenPoolAddress: any, side: Side, marginDelta: any, sizeDelta: any, triggerMarketPriceX96: any, triggerAbove: any, acceptableTradePriceX96: any, receiverAddress: any) => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    if (receiverAddress === '') receiverAddress = walletClient?.account.address
    const { data: createDecOrderData, isLoading: isCreateDecOrderLoading, isError: isCreateDecOrderError, write: createDecOrderWrite } = useContractWrite({
        address: orderBookAddress,
        abi: orderBookABI,
        functionName: 'createDecreaseOrder',
        args: [tokenPoolAddress, side, marginDelta, sizeDelta, triggerMarketPriceX96, triggerAbove, acceptableTradePriceX96, receiverAddress],
        value: minOrderBookExecutionFee

    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (createDecOrderData?.hash && createDecOrderData.hash !== previousHashRef.current) {
            (async () => {
                if (createDecOrderData?.hash) {
                    const receipt = await waitForTransaction({ hash: createDecOrderData?.hash });
                    previousHashRef.current = createDecOrderData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [createDecOrderData]);

    return {
        createDecOrderData,
        isCreateDecOrderLoading,
        isCreateDecOrderError,
        createDecOrderWrite
    }
}



export const useUpdateDecreaseOrder = (orderIndex: any, triggerMarketPriceX96: any, acceptableTradePriceX96: any) => {
    const { data: updateDecOrderData, isLoading: isUpdateDecOrderLoading, isError: isUpdateDecOrderError, write: updateDecOrderWrite } = useContractWrite({
        address: orderBookAddress,
        abi: orderBookABI,
        functionName: 'updateIncreaseOrder',
        args: [orderIndex, triggerMarketPriceX96, acceptableTradePriceX96]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (updateDecOrderData?.hash && updateDecOrderData.hash !== previousHashRef.current) {
            (async () => {
                if (updateDecOrderData?.hash) {
                    const receipt = await waitForTransaction({ hash: updateDecOrderData?.hash });
                    previousHashRef.current = updateDecOrderData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [updateDecOrderData]);

    return {
        updateDecOrderData,
        isUpdateDecOrderLoading,
        isUpdateDecOrderError,
        updateDecOrderWrite
    }
}



export const useCancelDecreaseOrder = (orderIndex: any, receiverAddress: any) => {
    const { data: cancelDecOrderData, isLoading: isCancelDecOrderLoading, isError: isCancelDecOrderError, write: cancelDecOrderWrite } = useContractWrite({
        address: orderBookAddress,
        abi: orderBookABI,
        functionName: 'cancelIncreaseOrder',
        args: [orderIndex, receiverAddress]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (cancelDecOrderData?.hash && cancelDecOrderData.hash !== previousHashRef.current) {
            (async () => {
                if (cancelDecOrderData?.hash) {
                    const receipt = await waitForTransaction({ hash: cancelDecOrderData?.hash });
                    previousHashRef.current = cancelDecOrderData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [cancelDecOrderData]);

    return {
        cancelDecOrderData,
        isCancelDecOrderLoading,
        isCancelDecOrderError,
        cancelDecOrderWrite
    }
}


export const useCreateTakeProfitAndStopLossOrders = (tokenPoolAddresss: any, side: Side, marginDeltas: Number[], sizeDeltas: Number[], triggerMarketPriceX96s: any[], acceptableTradePriceX96s: any[], receiverAddress: any) => {
    const { data: walletClient } = useWalletClient({
        chainId: arbitrumGoerli.id,
    })
    if (receiverAddress === '') receiverAddress = walletClient?.account.address


    const { data: createTPSLData, isLoading: isCreateTPSLLoading, isError: isCreateTPSLError, write: createTPSLWrite } = useContractWrite({
        address: orderBookAddress,
        abi: orderBookABI,
        functionName: 'createTakeProfitAndStopLossOrders',
        args: [tokenPoolAddresss, side, marginDeltas, sizeDeltas, triggerMarketPriceX96s, acceptableTradePriceX96s, receiverAddress],
        value: minOrderBookExecutionFee * 2n
    })
    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (createTPSLData?.hash && createTPSLData.hash !== previousHashRef.current) {
            (async () => {
                if (createTPSLData?.hash) {
                    const receipt = await waitForTransaction({ hash: createTPSLData?.hash });
                    previousHashRef.current = createTPSLData.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [createTPSLData]);

    return {
        createTPSLData,
        isCreateTPSLLoading,
        isCreateTPSLError,
        createTPSLWrite
    }
}