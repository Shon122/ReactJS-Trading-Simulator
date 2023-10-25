import React, { useEffect, useState } from "react";
import axios from "axios";
import Stock from "./Stock";
import { useNavigate } from "react-router-dom";
import GameModel from "./GameModel";
import Game from "./Game";
import { ToggleButton } from "./ToggleButton";
import style from "./style.css";

const Home = () => {
  const [gamemode, setGamemode] = useState("stocks");
  const [gameStarted, setGameStarted] = useState(false);
  const [stocksOn, setStocksOn] = useState(true);
  const [forexOn, setForexOn] = useState(false);
  const [cryptoOn, setCryptoOn] = useState(false);
  const [mostWins, setMostWins] = useState("-999");
  const [currentWins, setCurrentWins] = useState("-999");
  const navigate = useNavigate();

  ///////////////////////////////////
  //useEffects...
  useEffect(() => {
    console.log("gamemode: " + gamemode);
  }, [gamemode]);

  useEffect(() => {
    var newString = "";
    if (cryptoOn) {
      newString = newString + "crypto" + ",";
    }
    if (forexOn) {
      newString = newString + "forex" + ",";
    }
    if (stocksOn) {
      newString = newString + "stocks" + ",";
    }
    setGamemode(newString);
    console.log("gamemode: " + newString);
  }, [cryptoOn, forexOn, stocksOn]);

  useEffect(() => {
    console.log("stocksOn " + stocksOn);
  }, [stocksOn]);

  useEffect(() => {
    console.log("cryptoOn " + cryptoOn);
  }, [cryptoOn]);

  useEffect(() => {
    console.log("forexOn " + forexOn);
  }, [forexOn]);

  useEffect(() => {
    if (currentWins != "-999") {
      localStorage.setItem("currentRow", currentWins);
      if (currentWins > mostWins) {
        setMostWins(currentWins);
      }
    }
  }, [currentWins]);

  useEffect(() => {
    if (currentWins != "-999") {
      localStorage.setItem("mostRow", mostWins);
    }
  }, [mostWins]);

  useEffect(() => {
    // localStorage.setItem("currentRow", 0);
    // localStorage.setItem("mostRow", 0);
    const currentRow = parseInt(localStorage.getItem("currentRow"));
    const mostRow = parseInt(localStorage.getItem("mostRow"));
    console.log("cur row" + currentRow);
    console.log("most row" + mostRow);
    if (currentRow) {
      setCurrentWins(currentRow);
    } else {
      localStorage.setItem("currentRow", 0);
      setCurrentWins(0);
    }

    if (mostRow) {
      setMostWins(mostRow);
    } else {
      localStorage.setItem("mostRow", 0);
      setMostWins(0);
    }
  }, []);

  ///////////////////////////////////
  //funcs...


  const handleClick = (modeChanged) => {
    if (modeChanged === "stocks") {
      if (stocksOn === true && cryptoOn === false && forexOn === false) {
      } else {
        setStocksOn(!stocksOn);
      }
    }
    if (modeChanged === "crypto") {
      if (stocksOn === false && cryptoOn === true && forexOn === false) {
      } else {
        setCryptoOn(!cryptoOn);
      }
    }
    if (modeChanged === "forex") {
      if (stocksOn === false && cryptoOn === false && forexOn === true) {
      } else {
        setForexOn(!forexOn);
      }
    }
  };
  ///////////////////////////////////
  return (
   

    <div className="frame">
      <div className="div">
        <div className="overlap">
          <div className="overlap-2">
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <p className="trading-simulator">
                  <span className="text-wrapper">
                    Trading
                    <br />
                  </span>
                  <span className="span">Simulator</span>
                </p>

                <a
                  href="https://github.com/Shon122/Contact/tree/main"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="email"
                    alt="Email"
                    src="https://c.animaapp.com/TxtqjfxR/img/email-1@2x.png"
                  />
                </a>
                <a
                  href="https://github.com/Shon122"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="github-logo"
                    alt="Github logo"
                    src="https://c.animaapp.com/TxtqjfxR/img/github-logo@2x.png"
                  />
                </a>
              </div>
            </div>
            <div className="text-wrapper-2">
              All-Time Best Score: {mostWins}
            </div>
          </div>
          <div className="text-wrapper-3">Current Score: {currentWins}</div>
        </div>
        <div className="div-2">
          <img
            className="btc"
            alt="Btc"
            src="https://c.animaapp.com/TxtqjfxR/img/btc@2x.png"
          />
          <img
            className="forex"
            alt="Forex"
            src="https://c.animaapp.com/TxtqjfxR/img/forex@2x.png"
          />
          <img
            className="stocks"
            alt="Stocks"
            src="https://c.animaapp.com/TxtqjfxR/img/stocks@2x.png"
          />
          <div className="overlap-3">
            <div className="text-wrapper-4">Stocks</div>
            <ToggleButton
              onClick={() => handleClick("stocks")}
              className="toggle-button-instance  hover-pointer"
              property1={stocksOn ? "on" : "off"}
              modeOn={stocksOn}
            />
          </div>
          <div className="overlap-4">
            <div className="text-wrapper-5 ">Forex</div>
            <ToggleButton
              onClick={() => handleClick("forex")}
              className="toggle-button-instance  hover-pointer"
              property1={forexOn ? "on" : "off"}
              modeOn={forexOn}
            />
          </div>
          <div className="overlap-5">
            <div className="text-wrapper-6">Crypto</div>
            <ToggleButton
              className="toggle-button-instance hover-pointer"
              property1={cryptoOn ? "on" : "off"}
              modeOn={cryptoOn}
              onClick={() => handleClick("crypto")}
            />
          </div>
        </div>

        {!gameStarted ? (
          <div className="overlap-61 hover-pointer">
            <div
              onClick={() => {
                // Handle starting the game here
                setGameStarted(true);
                // moveToPage("game");
              }}
              className="div-wrapper-21 hover-pointer"
            >
              <div
                onClick={() => {
                  // Handle starting the game here
                  setGameStarted(true);
                  // moveToPage("game");
                }}
                className="text-wrapper-81 hover-pointer"
              >
                Start Game
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
  

        <div>
          {gameStarted && (
            <Game
              gamemodeValue={gamemode}
              currentWins={currentWins}
              mostWins={mostWins}
              updateWinsCurrent={setCurrentWins}
              updateWinsMost={setMostWins}
            />
          )}
        </div>

     
      </div>
    </div>
  );
};

export default Home;
