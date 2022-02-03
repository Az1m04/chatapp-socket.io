import React, { useEffect, useState } from 'react'
import { user } from '../pages/join'
import socketIO from 'socket.io-client'
import { useRouter } from 'next/router'
import Message from './message'
import ReactScrollToBottom from 'react-scroll-to-bottom'

let socket

const ENDPOINT = process.env.PORT

function chat() {
  const router = useRouter()

  const [id, setid] = useState('')
  const [message, setmessage] = useState([])

  const send = () => {
    const message = document.getElementById('chatinput').value
    socket.emit('message', { message, id })
    document.getElementById('chatinput').value = ''
  }

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ['websocket'] })
    socket.on('connect', () => {
      console.log('socket connected')
      setid(socket.id)
    })
    socket.emit('joined', { user })
    socket.on('welcome', (data) => {
      if (data?.user === undefined) {
        router.push('/')
      }
      setmessage([...message, data])
      console.log(data?.user, data?.message)
    })
    socket.on('userJoined', (data) => {
      setmessage([...message, data])

      console.log(data?.message)
    })

    return () => {
      socket.emit('disconnet')
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on('sendmessage', (data) => {
      setmessage([...message, data])
      console.log(data.user, data.message)
    })

    return () => {
      socket.off()
    }
  }, [message])

  return (
    <div className="mx-auto flex min-h-screen justify-center bg-gradient-to-t from-black to-gray-900 text-white ">
      <div
        className="mt-20 flex w-3/5 flex-col justify-start rounded-xl border border-blue-600  shadow-2xl shadow-blue-900/40 "
        style={{ height: '80vh' }}
      >
        <h1 className="h-12 w-full rounded-t-xl bg-blue-600  py-1 text-center text-3xl font-bold uppercase  text-white">
          Chat app
        </h1>
        <ReactScrollToBottom className=" flex h-full flex-col justify-end space-y-4 overflow-hidden ">
          {message?.map((item, i) => (
            <div className="pb-4">
              <Message
                message={item?.message}
                user={item.id === id ? '' : item?.user}
              />
            </div>
          ))}
        </ReactScrollToBottom>
        <div className="flex  h-20 w-full  items-end justify-end text-white">
          <div className=" mb-4 ml-4 w-full">
            <input
              type="text"
              id="chatinput"
              onKeyPress={(event)=>event.key==='Enter' ? send() :null}
              className="mr-4 w-full rounded-l-md border-y-2 border-l-2 border-blue-400 py-3 pl-4 text-lg  text-black shadow-md"
              placeholder="Enter message ..."
            />
          </div>
          <div className="mb-4 ">
            <button
              className="mr-4 h-14 rounded-r-md border-2 border-blue-400 bg-blue-600 p-2 px-5 text-lg uppercase text-white hover:opacity-90  "
              onClick={send}
            >
              send{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default chat
