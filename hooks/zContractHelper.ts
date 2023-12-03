import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import Decimal from "decimal.js";
import { BigNumberish } from "ethers";


export const minExecutionFee = parseEther('0.00021')


export const Q64 = 1n << 64n;
export const Q96 = 1n << 96n;

export const BASIS_POINTS_DIVISOR = 100_000_000n;

export const DECIMALS_18: number = 18;
export const DECIMALS_6: number = 6;

export const PREMIUM_RATE_AVG_DENOMINATOR: bigint = 8n * 259560n;
export const PREMIUM_RATE_CLAMP_BOUNDARY_X96: bigint = 4951760157141521099596497n;

export const VERTEX_NUM: bigint = 7n;
export const LATEST_VERTEX = VERTEX_NUM - 1n;

export type Side = number;
export const SIDE_LONG: Side = 1;
export const SIDE_SHORT: Side = 2;

export function isLongSide(side: Side) {
    return side === SIDE_LONG;
}

export function isShortSide(side: Side) {
    return side === SIDE_SHORT;
}

export function flipSide(side: Side) {
    if (side === SIDE_LONG) {
        return SIDE_SHORT;
    } else if (side === SIDE_SHORT) {
        return SIDE_LONG;
    }
    return side;
}

export enum Rounding {
    Down,
    Up,
}

// export function mulDiv(a: BigNumberish, b: BigNumberish, c: BigNumberish, rounding?: Rounding): bigint {
//     const mul = BigNumber.from(a).mul(b);
//     let ans = mul.div(c);
//     if (rounding != undefined && rounding == Rounding.Up) {
//         if (!ans.mul(c).eq(mul)) {
//             ans = ans.add(1);
//         }
//     }
//     return ans.toBigInt();
// }

export function toX96(value: string): bigint {
    return BigInt(new Decimal(value).mul(new Decimal(2).pow(96)).toFixed(0));
}

export function to0xxPriceX96(price: string) {
    return toPriceX96(price, DECIMALS_18, DECIMALS_6)
}

export function x96Price2Readable(value: bigint) {
    const factor = BigInt(2) ** BigInt(96);
    const x96ToWei = parseEther(value.toString()) / factor;
    const readable = formatUnits(x96ToWei, 6)
    return readable.toString();
}

export function wrapperParseEther6e(value: string) {
    return Number(parseUnits(value, 6))
}

export function wrapperFormatEther6e(value: bigint) {
    return Number(formatUnits(value, 6))
}

export function wrapperFormatEther18e(value: bigint) {
    return Number(formatEther(value))
}

//margin size
export function e6DivideE18(e6Number: bigint, e18Number: bigint, tokenPrice: bigint) {
    const factor = BigInt(10 ** 12);
    const adjustedE18Number = e18Number / factor;
    if (Number(adjustedE18Number) === 0) return 0
    const result = tokenPrice * adjustedE18Number / e6Number;
    return Number(result);
}

export function toPriceX96(price: string, tokenDecimals: number, usdDecimals: number): bigint {
    return BigInt(
        new Decimal(price)
            .mul(new Decimal(10).pow(usdDecimals))
            .div(new Decimal(10).pow(tokenDecimals))
            .mul(new Decimal(2).pow(96))
            .toFixed(0)
    );
}



export const giveMeFormattedToShow = (number: number) => tempCurrenyFormat(number);
export const giveMeNotNaNFormattedToShow = (param: any) => (param === 'NaN' || param === 'Infinity' || Number(param) < 0) ? ' -' : param;

export const tempCurrenyFormat = (number: number) => number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

