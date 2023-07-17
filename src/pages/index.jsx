import Image from 'next/image'
import { Inter } from 'next/font/google'
import React,{useState} from 'react'
import { Main } from 'next/document'
import Link from 'next/link'
import Popup from '../../component/Popup'
import Navbar from '../../component/Navbar'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 

  return (
   
   <div> 
   
   
   <Navbar/>

   <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to My Homepage</h1>
        <p className="text-gray-700">This is a Tailwind CSS example.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4">
          Get Started
        </button>
      </div>
    </div>
   
  
   
   </div>

  

  
  )
}


