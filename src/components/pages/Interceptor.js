import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'
import Custom from './Custom'
import userAuthData from '../../App'

export default function Interceptor() {
    const [viewData, setviewData] = useState()

    useEffect(() => {
        const viewId = window.location.href.replace(/.*\/custom\//, "")
        axios.post(`https://oceans777.herokuapp.com/custom/getView`, { id : viewId })
            .then(res => {
                console.log(userAuthData.jwt) //for testing
                console.log(res.data) //for testing
                setviewData(res.data)
            })
    }, [])
    

  return (
    <div>
      {viewData ? Custom(viewData) : <h1>404</h1>}
    </div>

  )
}