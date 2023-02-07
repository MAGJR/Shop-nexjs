
import type { AppProps } from 'next/app'

import { globalStyle } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app';
import LogoImg from  '@/assets/logo.svg'
import HomeImg from  '@/assets/Home.png'
import Image from 'next/image' 

globalStyle();
export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Container>
    <Header>
    <Image src={LogoImg}   alt=""/>
    </Header>
    <Component {...pageProps} />
    </Container>
  )
}
