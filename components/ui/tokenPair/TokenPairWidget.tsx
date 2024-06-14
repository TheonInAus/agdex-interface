import Image from "next/image"

import styles from "./TokenPairWidget.module.css"

interface TokenPairWidgetProps {
  token0: string
  token1: string
}

const TokenPairWidget = ({ token0, token1 }: TokenPairWidgetProps) => {
  return (
    <div className={styles.tokenPair}>
      <div className={styles.tokenImageFront}>
        <Image
          src={`/token/${token0.toLowerCase()}.svg`}
          alt={token0}
          width={46}
          height={46}
          className="rounded-full shadow-md"
        />
      </div>
      <div className={styles.tokenImageBack}>
        <Image
          src={`/token/${token1.toLowerCase()}.svg`}
          alt={token1}
          width={46}
          height={46}
          className="rounded-full shadow-md"
        />
      </div>
    </div>
  )
}

export default TokenPairWidget
