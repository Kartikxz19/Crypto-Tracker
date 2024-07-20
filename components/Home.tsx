import React from 'react'
import Card from './Card'

const Home = () => {
  return (
    <div className='flex flex-col mt-48 ml-11'>
        <div className='text-green-500 text-9xl font-semibold '>
            CRYPTO
        </div>
        <div className='text-black dark:text-white text-9xl font-semibold'>TRACKER.</div>
        <div className='mt-28 flex flex-row justify-between items-center gap-1 max-w-7xl'>
            <Card color='bg-black'/>
            <Card color='bg-green-500'/>
            <Card color='bg-black'/>
            <Card color='bg-green-500'/>
        </div>
    </div>
  )
}

export default Home