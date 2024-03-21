import {
  WalletName,
  WalletReadyState,
  isRedirectable,
  useWallet,
} from "@aptos-labs/wallet-adapter-react"

export default function ApotosConnectButtonWidget() {
  const { connect, wallets, account, disconnect } = useWallet()
  console.log("🚀 ~ onWalletConnectRequest ~ wallets:", wallets)
  //   const { setErrorAlertMessage } = useAlert()
  const wallet = wallets[0]
  const onWalletConnectRequest = async (walletName: WalletName) => {
    console.log("🚀 ~ onWalletConnectRequest ~ walletName:", walletName)
    try {
      await connect(walletName)
    } catch (error: any) {
      console.log("🚀 ~ onWalletConnectRequest ~ error:", error)
      //   setErrorAlertMessage(error)
    }
  }
  const mobileSupport = wallet.deeplinkProvider

  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable

  if (!isWalletReady && isRedirectable()) {
    // wallet has mobile app
    if (mobileSupport) {
      return (
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-700`}
          disabled={false}
          key={wallet.name}
          onClick={() => onWalletConnectRequest(wallet.name)}
        >
          <>{wallet.name}</>
        </button>
      )
    }
  } else {
    // we are on desktop view
    return (
      <button
        className={`bg-blue-500  text-white font-bold py-2 px-4 rounded mr-4 ${
          isWalletReady ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isWalletReady}
        key={wallet.name}
        onClick={() => onWalletConnectRequest(wallet.name)}
      >
        <>{`${wallet.name} ${account?.address
          ?.substring(0, 6)
          .concat("...")
          .concat(
            account?.address?.substring(
              account.address.length - 6,
              account.address.length
            )
          )} `}</>
      </button>
    )
  }
}
