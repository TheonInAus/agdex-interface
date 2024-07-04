"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSwapRate = void 0;
var ts_sdk_1 = require("@aptos-labs/ts-sdk");
var config = new ts_sdk_1.AptosConfig({
    network: ts_sdk_1.Network.TESTNET,
});
var aptos = new ts_sdk_1.Aptos(config);
var fetchSwapRate = function (source, destination) {
    var rates = aptos.view({
        payload: {
            function: "0x9e54d3231b270990fde73545f034dfa771696759e4f40ef8d5fc214cf88b4c6f::market::calculate_swap_fee",
            typeArguments: [source, destination],
            functionArguments: [],
        }
    });
    console.log("Rates");
    console.log("rates:");
    return rates;
};
exports.fetchSwapRate = fetchSwapRate;
(0, exports.fetchSwapRate)("0x1::aptos_coin::AptosCoin", "0x6f60af74988c64cd3b7c1e214697e6949db39c061d8d4cf59a7e2bd1b66c8bf0::usdc::USDC")
    .then(function (data) { var s = data[0], d = data[1]; console.log("s", s["value"], typeof (s)); console.log("d:", d["value"], typeof (d)); });
