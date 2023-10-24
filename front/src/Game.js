import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CandlestickChart from "./CandlestickChart";
import GameModel from "./GameModel";
import axios from "axios";
import Stock from "./Stock";
import { useNavigate } from "react-router-dom";
import { ToggleButton } from "./ToggleButton";
import style from "./style.css";

const Game = ({
  gamemodeValue,
  currentWins,
  mostWins,
  updateWinsCurrent,
  updateWinsMost,
}) => {
  // const location = useLocation();
  // const gameInfo = location.state.gameInfo; // Change "gameModel" to "gameInfo"
  const [gameEnded, setGameEnded] = useState(false);
  const [resultMessageEnd, setResultMessageEnd] = useState("");
  const [winLose, setWinLose] = useState(false); //false=lost true=win
  const [infoMessageEnd, setInfoMessageEnd] = useState("");
  const [midGame, setMidGame] = useState(false);
  const [dataShown, setDataShown] = useState(0);
  const [winsRow, setWinsRow] = useState(currentWins);
  const [mostWinsRow, setMostWinsRow] = useState(mostWins);
  const [currentGame, setCurrentGame] = useState(0);
  const timeframes = [["1min", "day", "15min", "5min"]];
  var dataExample = [
    {
      x: 5,
      y: [110, 120, 90, 110],
    },
    {
      x: 6,
      y: [110, 130, 100, 120],
    },
    {
      x: 7,
      y: [120, 140, 110, 30],
    },
  ];

  const [currentStock, setCurrentStock] = useState(dataExample);
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [currentTimeFrame, setCurrentTimeFrame] = useState("");
  const cryptoStockNames = [
    [
      "BTCUSD",
      "ETHUSD",
      "XRPUSD",
      "DOGEUSD",
      "LTCUSD",
      "BCHUSD",
      "ADAUSD",
      "DOTUSD",
      "LINKUSD",
      "BNBUSD",
      "XLMUSD",
      "USDTUSD",
      "UNIUSD",
      "EOSUSD",
      "XTZUSD",
      "VETUSD",
      "THETAUSD",
      "TRXUSD",
      "FILUSD",
      "AAVEUSD",
    ],
  ];

  const forexStockNames = [
    [
      "EURUSD",
      "USDJPY",
      "GBPUSD",
      "AUDUSD",
      "USDCAD",
      "USDCHF",
      "NZDUSD",
      "EURJPY",
      "GBPJPY",
      "AUDJPY",
      "EURGBP",
      "EURAUD",
      "GBPAUD",
      "EURCAD",
      "GBPCHF",
      "AUDCAD",
      "AUDNZD",
      "AUDCHF",
      "NZDJPY",
      "CHFJPY",
    ],
  ];

  const companyStockNames = [
    [
      "AAPL",
      "ABBV",
      "ABT",
      "ACN",
      "ADBE",
      "AMAT",
      "AMGN",
      "AMZN",
      "ATVI",
      "BA",
      "BAC",
      "BIIB",
      "CAT",
      "CHTR",
      "CMCSA",
      "COST",
      "CRM",
      "CSCO",
      "CVS",
      "CVX",
      "DELL",
      "DIS",
      "DOCU",
      "EA",
      "EBAY",
      "FB",
      "GE",
      "GM",
      "GOOGL",
      "GS",
      "HD",
      "HON",
      "IBM",
      "INTC",
      "JNJ",
      "JPM",
      "KO",
      "LOW",
      "LYFT",
      "MA",
      "MCD",
      "MDT",
      "MMM",
      "MRK",
      "MS",
      "MSFT",
      "NFLX",
      "NKE",
      "NOW",
      "NVDA",
      "ORCL",
      "PEP",
      "PFE",
      "PG",
      "PYPL",
      "QCOM",
      "SHOP",
      "SNAP",
      "SQ",
      "T",
      "TSLA",
      "TWTR",
      "UBER",
      "UNH",
      "UNP",
      "UTX",
      "V",
      "VZ",
      "WBA",
      "WFC",
      "WMT",
      "XOM",
      "ZM",
    ],
  ];

  const [correctAnswer, setCorrectAnswer] = useState("");

  // useEffect(() => {
  //   const currentRow = localStorage.getItem("currentRow");
  //   const mostRow = localStorage.getItem("mostRow");

  //   if (currentRow) {
  //     setWinsRow(currentRow);
  //   }

  //   if (mostRow) {
  //     setMostWinsRow(mostRow);
  //   }
  // }, []);

  useEffect(() => {
    generateGame();
  }, []);

  useEffect(() => {
    if (currentStock != dataExample) {
      setMidGame(true);
      startGame();
    } else {
      console.log("empty stock123");
    }
  }, [currentStock]);

  // useEffect(() => {
  //   if (winsRow != -999) {
  //     console.log("enterd winsrow:" + winsRow);
  //     localStorage.setItem("currentRow", winsRow);

  //     updateCurrentWins(winsRow);
  //     if (winsRow > mostWinsRow) {
  //       setMostWinsRow(winsRow);
  //       updateMostWins(winsRow);
  //       localStorage.setItem("mostRow", winsRow);
  //     }
  //   }
  // }, [winsRow]);

  const startGame = () => {
    if (currentStock.length > 500) {
      //make sure there are no big spikes in the prices
      var spikeExist = false;
      for (var i = 0; i < currentStock.length - 1; i++) {
        var number1 = currentStock[i].y[3];
        var number2 = currentStock[i + 1].y[3];
        var percentage = 30;
        const difference = Math.abs((number1 - number2) / number1) * 100;

        spikeExist = difference > percentage;
        if (spikeExist) {
          console.log("difference: " + difference);
          break;
        }
      }
      if (!spikeExist) {
        // Ensure that currentStock is defined and has enough data
        const randomIndex = Math.floor(
          Math.random() * (currentStock.length - 251)
        );
        var startIndex = randomIndex;
        var partialEndIndex = randomIndex + 200;
        var fullEndIndex = randomIndex + 250;
        var datePlayed = new Date().getTime();
        var symbol = currentSymbol;
        var result = "";
        var userPlayed = "user123";
        var stock = currentStock.slice();
        var splicedStock = stock.slice(startIndex, partialEndIndex);
        var fullSplicedStock = stock.slice(startIndex, fullEndIndex);

        const gameInfo = new GameModel(
          datePlayed,
          symbol,
          result,
          userPlayed,
          stock,
          splicedStock,
          fullSplicedStock
        );
        setCurrentGame(gameInfo);

        var correctans =
          fullSplicedStock[fullSplicedStock.length - 1].y[3] >
          splicedStock[splicedStock.length - 1].y[3]
            ? "up"
            : "down";
        setCorrectAnswer(correctans);
        setMidGame(true);
        setDataShown(splicedStock);
      } else {
        console.log("There is a spike in prices");
        generateGame();
      }
    } else {
      console.log("Not enough data in currentStock.");
      generateGame();
    }
  };

  const generateGame = () => {
    // Pass the gameModel as state to the Game page
    //slice up data + create game format
    setMidGame(false);
    setGameEnded(false);
    var randomName = "";
    var stringArray = [];
    if (gamemodeValue.indexOf("forex") !== -1) {
      stringArray.push("forex");
    }
    if (gamemodeValue.indexOf("crypto") !== -1) {
      stringArray.push("crypto");
    }
    if (gamemodeValue.indexOf("stocks") !== -1) {
      stringArray.push("stocks");
    }

    // Generate a random index between 0 and the array length - 1
    var randomIndex1 = Math.floor(Math.random() * stringArray.length);

    // Access the randomly chosen string
    var randomString1 = stringArray[randomIndex1];

    //here random stock name
    if (randomString1 === "forex") {
      const randomIndex = Math.floor(Math.random() * forexStockNames[0].length);
      randomName = forexStockNames[0][randomIndex];
      console.log("Randomly selected name: ", randomName);
    }
    if (randomString1 === "crypto") {
      const randomIndex = Math.floor(
        Math.random() * cryptoStockNames[0].length
      );
      randomName = cryptoStockNames[0][randomIndex];
      console.log("Randomly selected name: ", randomName);
    }
    if (randomString1 === "stocks") {
      const randomIndex = Math.floor(
        Math.random() * companyStockNames[0].length
      );
      randomName = companyStockNames[0][randomIndex];
      console.log("Randomly selected name: ", randomName);
    }

    //now generate rnd timeframe
    const randomIndex = Math.floor(Math.random() * timeframes[0].length);
    const rndTimeframe = timeframes[0][randomIndex];
    console.log("Randomly selected timeframe: ", rndTimeframe);
    setCurrentSymbol(randomName);
    if (rndTimeframe === "1min") setCurrentTimeFrame("1 Minute Candles");
    if (rndTimeframe === "5min") setCurrentTimeFrame("5 Minute Candles");
    if (rndTimeframe === "15min") setCurrentTimeFrame("15 Minute Candles");
    if (rndTimeframe === "day") setCurrentTimeFrame("Daily Candles");
    //now get stock info
    fetchSingleStockData(randomName, rndTimeframe);
  };

  const checkGuess = (guessAnswer) => {
    //after guess show timeframe+symbol, update current row and most wins row

    if (guessAnswer === correctAnswer) {
      // const currentRow = localStorage.getItem("currentRow");
      // const mostRow = localStorage.getItem("mostRow");

      // if (currentRow + 1 > mostRow) {
      //   localStorage.setItem(
      //     "mostRow",
      //     "5" + String(parseInt(currentGame) + 1)
      //   );
      // }
      // localStorage.setItem(
      //   "currentRow",
      //   "5" + String(parseInt(currentGame) + 1)
      // );
      updateWinsCurrent(winsRow + 1); //in the home.js i will update most
      setWinsRow(winsRow + 1);

      // // Save the value to localStorage
      // setWinsRow(parseInt(winsRow) + 1); // Update winsRow using setWinsRow
      setWinLose(true);
      setResultMessageEnd("You Guessed Correctly!");
    } else {
      setWinsRow(0);
      updateWinsCurrent(0);
      // localStorage.setItem("mostRow", 0);
      setWinLose(false);
      setResultMessageEnd("You Guessed Incorrectly");
    }
    setGameEnded(true);

    setDataShown(currentGame.fullSplicedStock);
  };

  const fetchSingleStockData = async (inputValue, timeVal) => {
    console.log(inputValue);
    console.log(timeVal);

    try {
      const response = await axios.get(
        `http://localhost:5000/stock-data?symbol=${inputValue}&timeframe=${timeVal}`
      );

      const stockData = response.data;
      console.log("Received stockData:", stockData); // Add this line to check the structure

      const newStock = new Stock(
        "",
        stockData.map((data) => data.open),
        stockData.map((data) => data.high),
        stockData.map((data) => data.low),
        stockData.map((data) => data.close),
        stockData.map((data) => data.date),
        "day"
      );

      const convertedStock = [];
      const { dates, openPrices, highPrices, lowPrices, closePrices } =
        newStock;
      const startDate = new Date("2001-05-05");
      for (let i = 0; i < dates.length; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i); // Increment the date by i days
        const formattedDate = currentDate.toISOString().split("T")[0]; // Format the date as "YYYY-MM-DD"

        const y = [openPrices[i], highPrices[i], lowPrices[i], closePrices[i]];
        convertedStock.push({ x: formattedDate, y });
      }
      // console.log("stock info inside fetchSingleStockData " + convertedStock);
      // console.log("original convertedStock " + convertedStock);
      setCurrentStock(convertedStock);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <>
    //   <div>
    //     <div>
    //       {midGame && (
    //         <CandlestickChart
    //           data={dataShown}
    //           width="1000"
    //           height="500"
    //           endGame={gameEnded}
    //         />
    //       )}
    //       {gameEnded ? (
    //         <p>
    //           {currentSymbol}, {currentTimeFrame}
    //         </p>
    //       ) : (
    //         <p>???</p>
    //       )}

    //       {/* <h1>Correct guesses in a row: {winsRow}</h1> */}
    //       {/* <h1>Most correct guesses in a row: {mostWinsRow}</h1> */}
    //       {!gameEnded && midGame && (
    //         <button onClick={() => checkGuess("up")}>up</button>
    //       )}
    //       {!gameEnded && midGame && (
    //         <button onClick={() => checkGuess("down")}>down</button>
    //       )}
    //       <div>
    //         {gameEnded && <button onClick={() => generateGame()}>Next</button>}
    //       </div>
    //     </div>
    //   </div>
    // </>

    <>
      <div className="div-3">
        <div className="div-wrapper">
          <div
            onClick={() => {
              if (gameEnded) {
                generateGame();
              }
            }}
            className={
              gameEnded ? "overlap-group-3 hover-pointer" : "overlap-group-3"
            }
          >
            <div
              onClick={() => {
                if (gameEnded) {
                  generateGame();
                }
              }}
              className="text-wrapper-7"
            >
              Next
            </div>
          </div>
        </div>
        <div className="p">
          {gameEnded ? (
            <p>
              Stock: {currentSymbol}, {currentTimeFrame}
            </p>
          ) : (
            <p>Stock: ?</p>
          )}
        </div>
        <div className="group">
          <div
            onClick={() => {
              if (!gameEnded && midGame) {
                checkGuess("up");
              }
            }}
            className={
              !gameEnded && midGame ? "overlap-6 hover-pointer" : "overlap-6"
            }
          >
            <div
              onClick={() => {
                if (!gameEnded && midGame) {
                  checkGuess("up");
                }
              }}
              className="text-wrapper-8"
            >
              Long
            </div>
          </div>
        </div>
        <div className="chart-wrapper">
          {midGame && (
            <CandlestickChart
              data={dataShown}
              width="1650"
              height="490"
              endGame={gameEnded}
            />
          )}
        </div>
        <div className="overlap-wrapper">
          <div
            onClick={() => {
              if (!gameEnded && midGame) {
                checkGuess("down");
              }
            }}
            className={
              !gameEnded && midGame ? "overlap-7 hover-pointer" : "overlap-7"
            }
          >
            <div
              onClick={() => {
                if (!gameEnded && midGame) {
                  checkGuess("down");
                }
              }}
              className="text-wrapper-9"
            >
              Short
            </div>
          </div>
        </div>
        <div className="overlap-611">
          <div className="text-wrapper-911">
            {!gameEnded && !midGame ? "Loading..." : ""}
          </div>
        </div>
        {winLose && gameEnded && (
          <div className="group123">
            <div className="overlap-123">
              <div className="text-wrapper-123">Correct!</div>
            </div>
          </div>
        )}
        {!winLose && gameEnded && (
          <div className="group321">
            <div className="overlap-321">
              <div className="text-wrapper-321">Incorrect!</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
