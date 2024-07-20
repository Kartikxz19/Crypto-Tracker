import React from 'react'

const Error = ({error}:{error:string}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black">
            <div className="text-center max-w-md w-full mx-4">
              <svg 
                className="mx-auto h-16 w-16 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Error Occurred
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                {error}
              </p>
            </div>
          </div>
  )
}

export default Error