import React from 'react'
import "./Alert.css"

export default function Alert(props) {
  return (
  
    props.alert&&
    <div className={`alertcont ${props.alert.type === "error"?"error":"success"}`}>
    <p>{props.alert.type} : {props.alert.message} </p>
   </div>
  )
}


