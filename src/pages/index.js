import React, { useEffect } from "react"

// Style
import "../assets/style.css"
// import { Radio, Alert, Button, Card, Progress, Result } from "antd"

// Images
import Logo from "../assets/logo.png"
import Button1Image from "../assets/test.jpg"
import Button2Image from "../assets/plates.jpg"

// Functions
import { exit } from "../utils/functions"

export default function Home() {
  useEffect(() => {
    document.onkeyup = function (data) {
      if (data.which === 27) {
        exit();
      }
    }
  })

  // Page
  return (
    <div className="container">
      {/* Header & Logo */}
      <div className="header">
        <img src={Logo} alt="DMV" />
      </div>
      {/* Navigation Menu */}
      <ul className="menu">
        <li>
          <a className="active" href="/">Home</a>
        </li>
        <li>
          <a href="/test">Driving Tests</a>
        </li>
        <li>
          <a href="/plates">Personalised Licence Plates</a>
        </li>
        <li className="exit"><a onClick={e => exit()} href="#" role="buton">Exit</a></li>
      </ul>
      {/* Content / Body */}
      <div class="wrapper">
        <h1>San Andreas Department of Motor Vehicles</h1>
        <div class="previewImages">
          <div class="image"><img src={Button1Image} alt="Theory" /><span class="label">Take your Driving Test <span class="price">$600</span></span></div>
          <div class="image"><img src={Button2Image} alt="Numberplate" /><span class="label">Reserve your private plate <span class="price">$???</span></span></div>
        </div>
        <p><b>About the DMV</b></p>
        <p>On average. Los Santos residents spend 7 hours a day sitting in traffic and another 6 hours a day complaining about sitting in traffic.</p>
        <p>Driving is an inescapable part of Los Santos life, as quintessentially San Andrean as showing up to work at 11:30 am. going for a 3 hour lunch, and wrapping up at 5pm to hit cocktail hour before an enjoyable evening spent swinging with your equally lost neighbours. It&#x27;s this daily cycle of not working very hard and sitting in traffic that results in our state leading the country in therapy, eating disorders. and the desperate pursuit of attention from anyone.</p>
        <p>It is simply impossible to survive in this state without a car. Walking is considered to be a sign of weakness, poverty or insanity. And public transport? What do you think this is? A modem urban metropolis? Wrong! It&#x27;s a post-modern hell hole in which only the rich and stupid are venerated.</p>
        <p>San Andreas car culture plays by its own rules. If you have a driving license from another state or country, forget everything you&#x27;ve learned. This is the land of aggression, drunk driving. and police chases. It is a jungle. Hot, dense, dangerous and full of rabid poor people who will chew your face off just for looking at them the wrong way.</p>
      </div>
    </div>
  )
}
