import Image from "next/image"

import styles from "./TokenPairWidget.module.css"

interface TokenPairWidgetProps {
  token1: string
  token2: string
}

const TokenPairWidget = ({ token1, token2 }: TokenPairWidgetProps) => {
  return (
    <div className={styles.tokenPair}>
      <div className={styles.tokenImageFront}>
        <Image
          src={`/token/${token1.toLowerCase()}.svg`}
          alt={token1}
          width={46}
          height={46}
          className="rounded-full shadow-md"
        />
      </div>
      <div className={styles.tokenImageBack}>
        <Image
          src={`/token/${token2.toLowerCase()}.svg`}
          alt={token2}
          width={46}
          height={46}
          className="rounded-full shadow-md"
        />
      </div>
    </div>
  )
}

export default TokenPairWidget
