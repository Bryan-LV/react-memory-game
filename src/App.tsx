import { useReducer, useEffect, useState } from 'react'
import './App.css'
interface Card {
  id: number,
  card: {
    view: string,
    pairId: number
  }
}

const data = [
  { id: 1, card: { view: 'X', pairId: 1 } },
  { id: 2, card: { view: 'X', pairId: 1 } },
  { id: 3, card: { view: 'Y', pairId: 2 } },
  { id: 4, card: { view: 'Y', pairId: 2 } },
  { id: 5, card: { view: 'Z', pairId: 3 } },
  { id: 6, card: { view: 'Z', pairId: 3 } },
  { id: 7, card: { view: 'A', pairId: 4 } },
  { id: 8, card: { view: 'A', pairId: 4 } },
  { id: 9, card: { view: 'B', pairId: 5 } },
  { id: 10, card: { view: 'B', pairId: 5 } },
  { id: 11, card: { view: 'C', pairId: 6 } },
  { id: 12, card: { view: 'C', pairId: 6 } }
];


// See https://github.com/coolaj86/knuth-shuffle
function shuffle(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
const shuffledData = shuffle(data);

function App() {
  const [totalMoves, setTotalMoves] = useState(0);
  const [lastPick, setLastPick] = useState<Card | null>(null);
  const [gameMove, setGameMove] = useState<number>(0);
  const [pairsSolved, setPairsSolved] = useState(0);


  const handleClick = (card: Card) => {
    setTotalMoves(ps => ps += 1);

    // remember last pick
    if (gameMove === 0) setLastPick(card);

    if (gameMove === 1) {
      if (card.card.pairId === lastPick?.card.pairId) {
        setPairsSolved(ps => ps += 1);
        // clear board
        setLastPick(null);
      }
    }

    setGameMove(ps => {
      let count = 0;
      if (ps === 0) count = 1;
      if (ps === 1) count = 0;
      return count;
    })
  }

  return (
    <div className="App">
      <h1>Pairs Solved: {pairsSolved}</h1>
      <h1 className="">Total Moves: {totalMoves}</h1>
      <div className="gameboard">
        {shuffledData.map(card => {
          return (
            <div className="card-container">
              <div className="card" id={card.id.toString()} key={card.id} onClick={() => handleClick(card)}>
                <h1>{card.card.view}</h1>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
