
/**
 * Just for deplopment env ,this is gonna be execute in ChainLink upkeep(automation) Or back-end system ...
 */
import { useContractWrite } from "wagmi"
import { mixExecutorAddress } from "./zAddressHelper"
import { minExecutorABI } from "@/abis/mixExecutorABI"
import { useEffect, useRef } from "react"
import { waitForTransaction } from 'wagmi/actions';

const exeNumber = 10000

export const useExeOpenLiqPosition = () => {

    const { data, isLoading, isError } = useContractWrite({
        address: mixExecutorAddress,
        functionName: "executeOpenLiquidityPositions",
        abi: minExecutorABI,
        args: [exeNumber]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (data?.hash && data.hash !== previousHashRef.current) {
            (async () => {
                if (data?.hash) {
                    const receipt = await waitForTransaction({ hash: data?.hash });
                    previousHashRef.current = data.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError
    }
}

export const useExeAdjustLiqOpen = () => {
    const { data, isLoading, isError } = useContractWrite({
        address: mixExecutorAddress,
        functionName: "executeAdjustLiquidityPositionMargins",
        abi: minExecutorABI,
        args: [exeNumber]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (data?.hash && data.hash !== previousHashRef.current) {
            (async () => {
                if (data?.hash) {
                    const receipt = await waitForTransaction({ hash: data?.hash });
                    previousHashRef.current = data.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError
    }

}

export const useExeCloseLiqPosition = () => {
    const { data, isLoading, isError } = useContractWrite({
        address: mixExecutorAddress,
        functionName: "executeCloseLiquidityPositions",
        abi: minExecutorABI,
        args: [exeNumber]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (data?.hash && data.hash !== previousHashRef.current) {
            (async () => {
                if (data?.hash) {
                    const receipt = await waitForTransaction({ hash: data?.hash });
                    previousHashRef.current = data.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError
    }
}

export const useExeIncreaseRBF = () => {
    const { data, isLoading, isError } = useContractWrite({
        address: mixExecutorAddress,
        functionName: "executeIncreaseRiskBufferFundPositions",
        abi: minExecutorABI,
        args: [exeNumber]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (data?.hash && data.hash !== previousHashRef.current) {
            (async () => {
                if (data?.hash) {
                    const receipt = await waitForTransaction({ hash: data?.hash });
                    previousHashRef.current = data.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError
    }
}

export const useExeDecreaseRBF = () => {
    const { data, isLoading, isError } = useContractWrite({
        address: mixExecutorAddress,
        functionName: "executeDecreaseRiskBufferFundPositions",
        abi: minExecutorABI,
        args: [exeNumber]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (data?.hash && data.hash !== previousHashRef.current) {
            (async () => {
                if (data?.hash) {
                    const receipt = await waitForTransaction({ hash: data?.hash });
                    previousHashRef.current = data.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError
    }
}


export const useExeIncreasePosition = () => {
    const { data, isLoading, isError, write } = useContractWrite({
        address: mixExecutorAddress,
        functionName: "executeIncreasePositions",
        abi: minExecutorABI,
        args: [exeNumber]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (data?.hash && data.hash !== previousHashRef.current) {
            (async () => {
                if (data?.hash) {
                    const receipt = await waitForTransaction({ hash: data?.hash });
                    previousHashRef.current = data.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError,
        write
    }
}

export const useExeDecreasePosition = () => {
    const { data, isLoading, isError, write } = useContractWrite({
        address: mixExecutorAddress,
        functionName: "executeDecreasePositions",
        abi: minExecutorABI,
        args: [exeNumber]
    })

    const previousHashRef = useRef<string | undefined>();

    useEffect(() => {
        if (data?.hash && data.hash !== previousHashRef.current) {
            (async () => {
                if (data?.hash) {
                    const receipt = await waitForTransaction({ hash: data?.hash });
                    previousHashRef.current = data.hash;
                    if (receipt.status === 'success') {
                    } else {
                    }
                }
            })();
        }
    }, [data]);

    return {
        data,
        isLoading,
        isError,
        write
    }
}

