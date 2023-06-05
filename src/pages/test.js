import React, { useState, useEffect } from "react"
import { Radio, Alert, Button, Card, Progress, Result } from "antd"
import Logo from "../assets/logo.png"
import "../assets/style.css"

export default function Home() {
    useEffect(() => {
        document.onkeyup = function (data) {
            if (data.which === 27) {
                exit();
            }
        }
    })

    function exit() {
        fetch('http://highlife/CloseDMVNui', {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({}),
        }).then(resp => resp.json())
    }

    return (
        <div className="container">
            {/* Header & Logo */}
            <div className="header">
                <img src={Logo} alt="DMV" />
            </div>
            {/* Navigation Menu */}
            <ul className="menu">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a className="active" href="/test">Driving Tests</a>
                </li>
                <li>
                    <a href="/plates">Personalised Licence Plates</a>
                </li>
                <li className="exit"><a href="#" role="buton">Exit</a></li>
            </ul>
            {/* Content / Body */}
            <div class="wrapper">
                <h1>Take your Theory Test</h1>
                <p>San Andreas car culture plays by its own rules. If you have a driving license from another state or country, forget everything you&#x27;ve learned. This is the land of aggression, drunk driving. and police chases. It is a jungle. Hot, dense, dangerous and full of rabid poor people who will chew your face off just for looking at them the wrong way.</p>
                <p><b>Start your test by pressing the button below:</b></p>
                <button type="button" class="ant-btn ant-btn-primary ant-btn-block"><span>Start the Test</span></button>
            </div>
        </div>
    )
}
