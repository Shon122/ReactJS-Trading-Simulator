class GameModel {
  constructor(
    datePlayed,
    symbol,
    result,
    userPlayed,
    stock,
    partialSplicedStock,
    fullSplicedStock,
    timeframe
  ) {
    this.datePlayed = datePlayed;
    this.userPlayed = userPlayed;
    this.stock = stock;
    this.partialSplicedStock = partialSplicedStock; // the user will see before guessing
    this.fullSplicedStock = fullSplicedStock; // the user will see after guessing
    this.symbol = symbol;
    this.result = result; //"won"/"lost"
    this.timeframe=timeframe
  }
}

export default GameModel;
