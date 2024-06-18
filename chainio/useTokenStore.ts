import { create } from 'zustand'
import { PoolInfo, PoolList, VaultInfo, VaultList } from './helper';

interface TokenState {
    vault: VaultInfo;
    symbol: PoolInfo;
    setVault: (vault: VaultInfo) => void;
    setSymbol: (symbol: PoolInfo) => void;
}

const useTokenStore = create<TokenState>((set) => ({
    vault: VaultList[0],
    symbol: PoolList[0],
    setVault: (vault: VaultInfo) => set({ vault }),
    setSymbol: (symbol: PoolInfo) => set({ symbol }),
}));

export default useTokenStore;