import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'
import Custom from './Custom'
import userAuthData from '../../App'

export default function Interceptor() {
  const [viewData, setviewData] = useState()

  useEffect(() => {
    const viewId = window.location.href.replace(/.*\/custom\//, "")
    axios.post(`https://oceans777.herokuapp.com/custom/getView`, { id: viewId })
      .then(res => {
        setviewData(res.data)
      })
      .catch(err => {
      })
  }, [])


  return (
    <div>
      {viewData ? Custom(viewData) : <h1>404</h1>}
    </div>

  )
}