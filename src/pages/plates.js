import React, { useState, useEffect } from "react"
import { Radio, Alert, Button, Card, Progress, Result } from "antd"
import Logo from "../assets/logo.png"
import PlateImage from "../assets/plate.png"
import "../assets/style.css"

export default function Home() {
  const [plate, setPlate] = useState("DMV");
  const [price, setPrice] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [available, setAvailable] = useState(false);
  const [plates, setPlates] = useState([]);
  const [purchaseSuccessful, setPurchaseSuccessful] = useState(false);

  useEffect(() => {
    document.onkeyup = function (data) {
      if (data.which === 27) {
        exit();
      }
    }

    window.eventHandler = function (item) {
      if (item.nui_reference === 'dmv_error') {
        /* 
         data: { error (String) }
        */
        setErrorFn(item.data.error);
      } else if (item.nui_reference === 'dmv_availibility') {
        /* 
           SUCCESS data: { available (Boolean), plate (string), price (integer) }
           FAILURE data: { available (Boolean), message (string) }
        */
        setAvailableFn(item.data.available);

        if (item.data.available) {
          setPlateFn(item.plate);
          setPriceFn(item.price);
          setErrorFn(undefined);
        } else {
          setErrorFn(item.data.message);
        }
      } else if (item.nui_reference === 'dmv_purchase') {
        /* 
           SUCCESS: data: { success (Boolean), plate (String), price(integer) }
           FAILURE: data: { success (Boolean), message (String) }
        */
        if (item.data.success) {
          setErrorFn(undefined);
        } else {
          setErrorFn(item.data.message);
        }
      } else if (item.nui_reference === 'dmv_plates') {
        if (item.data && item.data.plates) {
          setPlatesFn(item.data.plates);
        }
      }
    };
  });

  function exit() {
    fetch('http://highlife/CloseDMVNui', {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),
    }).then(resp => resp.json())
  }

  function setPlateFn(plate) {
    let temp = plate;
    setPlate((temp.replace(/o/gi, '')).replace(/[^a-z0-9+]+/gi, ''));
  }

  function setErrorFn(message) {
    setError(message);
  }

  function setPriceFn(price) {
    setPrice(price);
  }

  function setAvailableFn(boolean) {
    setAvailable(boolean);
  }

  function setPlatesFn(array) {
    setPlates(array);
  }

  function resetAll() {
    setPlate("DMV");
    setPrice(undefined);
    setError(undefined);
    setAvailable(false);
    setPlates([]);
    setPurchaseSuccessful(false);
  }

  function sendPlate() {
    fetch('http://highlife/dmvCheckPlateAvailibility', {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ plate }),
    })
      .then(resp => resp.json())
  }

  function sendPurchase() {
    fetch('http://highlife/dmvPurchasePlate', {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ plate, price }),
    })
      .then(resp => resp.json())
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
          <a href="/test">Driving Tests</a>
        </li>
        <li>
          <a className="active" href="/plates">Personalised Licence Plates</a>
        </li>
        <li className="exit"><a href="#" role="buton">Exit</a></li>
      </ul>
      {/* Content / Body */}
      <link href="https://fonts.cdnfonts.com/css/plat-nomor" rel="stylesheet"/>
      <div className="wrapper">
        <h1>Purchasing a Personalised Licence Plate</h1>
        <p>
          Fancy being able to brag to your friends that your cars a peice of shit, or you want to brag you&#x27;re a dealer with a special plate? Here you can reserve your very own personalised licence plate for your favourite <i><strike>bumper car</strike></i> personal vehicle.
        </p>
        {purchaseSuccessful ?
          <Result
            status="success"
            title={`Successfully Purchased Licence Plate (${plate})`}
            subTitle={`You purchased this plate for $${price} You can now assign this to your vehicle at the nearest garage.`}
            extra={[
              <Button onClick={resetAll()} type="primary">
                Go back
              </Button>
            ]}
          /> : <>
            <div className="alerts">
              {error && error !== undefined ? <Alert message={error} type="error" showIcon /> : ''}
            </div>

            <div id="plate" style={{ backgroundImage: `url(${PlateImage})` }}>
              <input
                pattern="[A-Za-z]{3}"
                value={plate}
                maxLength={8}
                onChange={e => setPlateFn(e.target.value)}
                type="text"
              />
            </div>
            <div className="buttons">
              <Button onClick={e => sendPlate()}>Check Availibility</Button>
              {available ? <Button onClick={e => sendPurchase()} type="primary">Purchase Licence Plate</Button> : ''}
            </div>
            {price ? <div className="pricing">
              <label>This plate will cost you:</label>
              <span>$500,000</span>
            </div> : ''}
            {plates && Array.isArray(plates) && plates.length > 0 ? <>
              <h1>Owned Licence Plates ({plates.length})</h1>
              <p>Here are the licence plates you currently own. You can assign these to your vehicles at the nearest garage.</p>
              <div className="plates_list">
                {plates.map((plate, i) => (
                  <div key={i} className="plates_list_col"><div style={{ backgroundImage: `url(${PlateImage})` }} className="small_plate">{plate}</div></div>
                ))}
              </div></> : ''}
          </>}
      </div>
    </div>
  )
}
