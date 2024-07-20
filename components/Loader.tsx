import Image from 'next/image'
import React from 'react'
import loader from '@/public/loading.svg'
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black">
            <div className="text-center">
              <Image src={loader} alt="Loading" className="w-16 h-16 mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
          </div>
  )
}

export default Loader