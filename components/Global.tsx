import React from 'react'
import { MoveRight } from 'lucide-react';
import { Chartcomponent } from './GlobalChart'
import Topcrypto from './Topcrypto'
import Link from 'next/link';
const Global = () => {
  return (
    <div className='mt-24 ml-11'>
        <h1 className='text-black dark:text-white text-5xl font-bold my-10'>THE CURRENT CRYPTO MARKET</h1>
        <div className="flex gap-5">
        <div className='w-8/12'>
            <Chartcomponent/>
        </div>
        <div className='w-4/12'>
            <Topcrypto/>
        </div>
        </div>
        <Link href={"/Explore"} >
          <button className='bg-green-500 hover:bg-black dark:hover:bg-white dark:hover:text-black duration-300 hover:scale-110 text-white font-bold py-2 px-4 rounded-sm flex gap-1 items-center mx-auto mt-10 mb-24'>
          EXPLORE MORE <MoveRight size={24}/>
          </button>
        </Link>
    </div>
  )
}

export default Global