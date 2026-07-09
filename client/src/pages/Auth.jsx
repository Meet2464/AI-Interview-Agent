import React from 'react'
import { BsRobot } from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'motion/react';
import { linkWithCredential, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { ServerUrl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux' 
import { setUserData } from '../redux/userSlice';


function Auth({isModel = false}) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const Response = await signInWithPopup(auth,provider)
            let User = Response.user
            let name =  User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" ,
                 {name , email } , {withCredentials : true})
                 dispatch(setUserData(result.data))

        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

  return (
    <div className = {`
        w-full 
        ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>

      <motion.div 
      initial ={{opacity: 0 , y:-40}}
      animate = {{opacity:1, y:0}}
      transition={{duration:1.05}}
      className={`
      w-full 
      ${isModel ? "max-w-md p-8 rounded-3xl" : " max-w-ig p-12 rounded-[32px]"}
       bg-white shadow-2xl border border-gray-200
       `}>

        <div className='flex items-center justify-center gap-3 mb-6'>
            <div className='bg-black text-white rounded-lg p-2'>
                <BsRobot size={18}/>
            </div>
            <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
        </div>
        <h1 className='text-2xl md:text-3l font-semibold text-center leading-snug mb-4'>
                Continue With{" "}
                
                <span className='bg-green-100 text-green-600 px-3
                py-1 rounded-full inline-flex items-baseline gap-2'>
                    <IoSparkles size={16} />
                    AI Smart Interview
                </span>
            </h1>

            <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start AI-Powered mock Interview, track your progress and unlock detailed performance insights. 
            </p>

            <motion.button 
            onClick={handleGoogleAuth}
            whileHover={{opacity:0.9, scale: 1.03 }}
            whileTap={{opacity: 1 , scale: 0.98}}
            className='w-full justify-center flex bg-black items-center gap-3 py-3 text-white rounded-full shadow-md'>
                <FcGoogle size={18}/>
                Continue With Google
            </motion.button>

      </motion.div>
    </div>
  )
}

export default Auth
