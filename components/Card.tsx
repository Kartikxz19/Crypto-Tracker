import { HammerIcon } from 'lucide-react'
import React from 'react'

const Card = ({color}:{color:string}) => {
    const bgcolor=color?color:'bg-white'
  return (
    <div className={`${bgcolor} size-56 rounded-lg flex flex-col gap-4 items-center justify-center text-center hover:scale-105`}>
        <HammerIcon color='white'/>
        <div className={`text-white w-full mx-auto`}> Lorem ipsum dolor sit amet.</div>
    </div>
  )
}

export default Card