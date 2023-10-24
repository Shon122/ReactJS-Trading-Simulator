class Stock {
  constructor(
    symbol,
    openPrices,
    highPrices,
    lowPrices,
    closePrices,
    dates,
    timeframe
  ) {
    this.name = symbol;
    this.openPrices = openPrices;
    this.highPrices = highPrices;
    this.lowPrices = lowPrices;
    this.closePrices = closePrices;
    this.dates = dates;
    this.timeframe = timeframe;
  }
}

export default Stock;
