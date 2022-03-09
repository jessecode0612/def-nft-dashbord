import Head from 'next/head'
import { useMemo } from 'react'

interface SEOProps {
  cardName?: string
  chain?: string
  token?: string
  tvl?: string
  volumeChange?: string
  logo?: string
  nftPage?: boolean
}

const SEO = ({ cardName, chain, token, tvl, volumeChange, logo, nftPage = false }: SEOProps) => {
  const windowURL = typeof window !== 'undefined' && window.location.href ? window.location.href : ''

  const isTvlValid = tvl && tvl !== '$0'

  const isVolumeChangeValid = volumeChange && volumeChange !== 'NaN%' && volumeChange !== 'undefined%'

  const cardURL = useMemo(() => {
    let cardSrc = new URL(`https://dev.getmrblock.com/`)

    // If text is default, the image will only have the logo in the center, without any tvl numbers, chain or token name etc
    let text: string = cardName ? (cardName === 'All' ? 'Overall' : cardName) : 'default'

    cardSrc.pathname = `${encodeURIComponent(text)}.jpeg`

    cardSrc.searchParams.append('theme', 'dark')

    cardSrc.searchParams.append('valueHeader', nftPage ? 'Total Volume' : 'Total Value Locked')

    isTvlValid && cardSrc.searchParams.append('tvl', tvl)

    isVolumeChangeValid && cardSrc.searchParams.append('volumeChange', volumeChange)

    cardSrc.searchParams.append('footerURL', encodeURIComponent(windowURL))

    // First url in images should always be the logo of defillama
    let images = nftPage
      ? [`https://www.mrblocknft.com/assets/images/hero-lg-@2x.jpg`]
      : [`https://www.mrblocknft.com/assets/images/hero-lg-@2x.jpg`]

    for (let image of images) {
      cardSrc.searchParams.append('images', image)
    }

    return cardSrc.toString()
  }, [cardName, chain, token, tvl, volumeChange, logo, nftPage, windowURL, isTvlValid, isVolumeChangeValid])

  return (
    <Head>
      <meta
        name="description"
        content="MrBlock Defi TVL and NFT volume Trading Tashboard. It is committed to providing accurate data without ads or sponsored content, as well as transparency"
      />

      <meta property="og:title" content="MrBlock Defi/NFT" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={windowURL} />
      <meta property="og:site_name" content="MrBlock Defi/NFT" />
      <meta
        property="og:description"
        content="MrBlock Defi TVL and NFT volume Trading dashboard. It is committed to providing accurate data without ads or sponsored content, as well as transparency."
      />
      <meta property="og:image" content={cardURL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="defi.getmrblock.com" />
      <meta property="twitter:url" content={windowURL} />
      <meta name="twitter:title" content="MrBlock" />
      <meta name="twitter:site" content="@MrBlock" />
      <meta name="twitter:creator" content="@MrBlock" />
      <meta
        name="twitter:description"
        content="MrBlock Defi TVL and NFT volume Trading dashboard. It is committed to providing accurate data without ads or sponsored content, as well as transparency"
      />
      <meta name="twitter:image" content={cardURL} />
    </Head>
  )
}

export default SEO
