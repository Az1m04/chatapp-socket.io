import Head from 'next/head'
import Link from 'next/link'
import socketIO from 'socket.io-client'
import Join from './join'

const socket = socketIO(`${process.env.PORT}`, { transports: ['websocket'] })

export default function Home() {
  socket.on('connect', () => {})
  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-gray-900 ">
      <Head>
        <title>Chat App</title>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Link href="/">
        <Join />
      </Link>
    </div>
  )
}
