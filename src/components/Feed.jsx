import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import api from '../services/api'

const Feed = () => {
  // console.log("Feed component rendered");
  const [loading, setLoading] = useState(true)
  const { category }  = useParams();
  const [pins, setPins] = useState([])
  console.log(category)
  useEffect (() => {
    console.log("inside use effect")
    setLoading(true)
    if(category){
      setLoading(true)
      console.log("Inside if Block Caterogry ID is: " + category)
      api.getPins({category})
      .then(response => {
        setPins(response.data)
        // navigate('/home')
        console.log('Got images', response.data);
    }).catch(error => {
        console.error('Error Retrieving Images with Selected Category:', error);
    })
      setLoading(false)
    } else {
      setLoading(true)
      console.log("Inside Else Block Caterogry ID is: " + category)
      api.getPins()
      .then(response => {
          setPins(response.data)
          // navigate('/home')
          // console.log('Got images', response.data);
      }).catch(error => {
          console.error('Error Retrieving Images Category:', error);
      })
      setLoading(false)
    }
  },[category])

  // if(loading) return <Spinner message="we are adding new ideas to your feed!" />
  return (
    <div>
      {pins && <MasonryLayout pins={pins} /> }
    </div>
  )
}

export default Feed
