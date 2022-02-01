import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Bg from '../public/bg.png'
import LOGO from '../public/logo1.png'
let user

function Join() {
  const sendUser = () => {
    user = document?.getElementById('joinInput').value
    if (user === '') setNewAlert(true)
    setTimeout(() => {
      setNewAlert(false)
    }, 5000)
  }

  const [name, setname] = useState('')
  const [newAlert, setNewAlert] = useState(false)

  return (
    <div className="mx-auto flex justify-center text-white">
      <div
        className="mt-20 flex w-3/5 flex-col justify-start rounded-xl border border-blue-600  shadow-2xl shadow-blue-900/40 "
        style={{ height: '80vh' }}
      >
        <h1 className="h-12 w-full rounded-t-xl bg-blue-600  py-1 text-center text-3xl font-bold uppercase  text-white">
          Chat app
        </h1>
        {newAlert && (
          <div className="mb-5 absolute top-[150px] right-[400px] ">
            <div
              className=" relative w-72 rounded-lg bg-red-100 py-3 pl-4 pr-10 leading-normal text-red-700"
              role="alert"
            >
              <p>Please enter user name</p>
              <span
                class="absolute inset-y-0 right-0 mr-4 flex items-center"
                onClick={() => setNewAlert(false)}
              >
                <svg
                  class="h-4 w-4 fill-current"
                  role="button"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        )}
        <div className="flex h-full items-center text-white">
          <div className="    w-full ">
            <div>
              <Image src={Bg} alt="" objectFit="contain" />
            </div>
          </div>
          <div className="flex h-full w-full items-center rounded-b-xl bg-white">
            <div className="w-full">
              <div className="mx-auto flex justify-center p-10">
                <Image height={100} src={LOGO} alt="" objectFit="contain" />
              </div>

              <div className="mb-8  flex justify-center ">
                <input
                  type="text"
                  id="joinInput"
                  value={name}
                  className="w-72 rounded-md border-2 border-blue-400 p-2 py-3 pl-4 text-lg text-black  shadow-md"
                  placeholder="Enter user name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              <div className="mb-20  flex justify-center">
                <Link href={name !== '' ? '/chat' : ''}>
                  <button
                    type="submit"
                    onClick={sendUser}
                    className="w-72  rounded-md bg-blue-600 p-2 py-3 text-lg  font-semibold uppercase shadow-md  hover:opacity-80"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join

export { user }
