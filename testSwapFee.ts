import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk";
const config = new AptosConfig({
  network: Network.TESTNET,
});
const aptos = new Aptos(config);

export const fetchSwapRate = (source: string, destination: string) => {
    let rates =  aptos.view({
        payload: {
            function: "0x9e54d3231b270990fde73545f034dfa771696759e4f40ef8d5fc214cf88b4c6f::market::calculate_swap_fee",
            typeArguments: [source, destination],
            functionArguments: [],
        }
    });

    return rates;
}

fetchSwapRate(
    "0x1::aptos_coin::AptosCoin",
    "0x6f60af74988c64cd3b7c1e214697e6949db39c061d8d4cf59a7e2bd1b66c8bf0::usdc::USDC"
)
.then((data) => { const [s, d] = data; console.log("s:",s["value"], typeof(s));console.log("d:",d["value"], typeof(d))})