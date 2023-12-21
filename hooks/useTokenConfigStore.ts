import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tokenConfig, TokenConfigType } from './zTokenConfig';

// Define the state interface
interface TokenConfigStoreState {
    currentTokenEntity: TokenConfigType;
    setCurrentTokenEntity: (entity: TokenConfigType) => void;
}

// Create the store with typed state
const useTokenConfigStore = create<TokenConfigStoreState>(
    (set) => ({
        currentTokenEntity: tokenConfig[0], // set the initial state
        setCurrentTokenEntity: (entity: TokenConfigType) => set({ currentTokenEntity: entity }),
    }),

);

export default useTokenConfigStore;
