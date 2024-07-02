import { create } from 'zustand'
import { PoolInfo, PoolList, VaultInfo, VaultList } from './helper';

interface TokenState {
    vault: VaultInfo;
    vault2: VaultInfo;
    symbol: PoolInfo;
    setVault: (vault: VaultInfo) => void;
    setVault2: (vault2: VaultInfo) => void;
    setSymbol: (symbol: PoolInfo) => void;
}

const useTokenStore = create<TokenState>((set) => ({
    vault: VaultList[0],
    vault2: VaultList[1],
    symbol: PoolList[0],
    setVault: (vault: VaultInfo) => set({ vault }),
    setVault2: (vault2: VaultInfo) => set({ vault2 }),
    setSymbol: (symbol: PoolInfo) => set({ symbol }),
}));

export default useTokenStore;