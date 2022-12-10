import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'

export default function Interceptor() {
    const [variable, setVariable] = useState("nothing")

    useEffect(() => {
        const fetchURL = window.location.href.replace(/.*\/custom\//, "")
        const fetchData = async () => {
            const response = await fetch("https://oceans777.herokuapp.com/" + fetchURL);
            const json = await response.json().then((data) => {
                console.log(data);
            });
            setVariable(json)
        }
        fetchData()
        console.log(fetchURL)
    }, [])
    

  return (
    <div>{variable}</div>
  )
}