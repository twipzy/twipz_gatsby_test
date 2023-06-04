import * as React from "react"
// import { Radio, Alert, Button, Card, Progress, Result } from "antd"
import "../assets/style.css"

export default function Home() {
  return (
    <div className="container">
    <div className="header">
    </div>
    <ul className="menu">
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">Driving Tests</a>
      </li>
      <li>
        <a href="#">Personalised Licence Plates</a>
      </li>
      <li className="exit"><a href="#" role="buton">Exit</a></li>
    </ul>
    </div>
  )
}
