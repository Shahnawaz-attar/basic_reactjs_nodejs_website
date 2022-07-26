import React, { useEffect, useState } from 'react'
import Blogs from './Blogs'
import HeroSection from './HeroSection'
// axios
import axios from 'axios'
const API_URL = 'https://api.imgflip.com/get_memes'


export const Home = () => {

    const [memes, setMemes] = useState([])
    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setMemes(res.data.data.memes)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    } , [])

  return (
    <>
    <HeroSection />
    <Blogs  blogs={memes} />
    </>
  )
}
