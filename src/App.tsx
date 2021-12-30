import { useState } from 'react'
import './App.css'
import {cow, crocodile, flamingo, fox, giraffe, tiger} from './assets';
interface Card {
   id: number,
   card: {
      view: string,
      pairId: number 
      solved: boolean
   }
}

const data = [
   { id: 1, card: { view: cow, pairId: 1, solved: false } },
   { id: 2, card: { view: cow , pairId: 1, solved: false } },
   { id: 3, card: { view: giraffe, pairId: 2, solved: false } },
   { id: 4, card: { view: giraffe, pairId: 2, solved: false } },
   { id: 5, card: { view: crocodile, pairId: 3, solved: false } },
   { id: 6, card: { view: crocodile, pairId: 3, solved: false } },
   { id: 7, card: { view: flamingo, pairId: 4, solved: false } },
   { id: 8, card: { view: flamingo, pairId: 4, solved: false } },
   { id: 9, card: { view: fox, pairId: 5, solved: false } },
   { id: 10, card: { view: fox, pairId: 5, solved: false } },
   { id: 11, card: { view: tiger, pairId: 6, solved: false } },
   { id: 12, card: { view: tiger, pairId: 6, solved: false } }
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
const shuffledData: Card[] = shuffle(data);

function App() {
   const [totalMoves, setTotalMoves] = useState(0);
   const [lastPick, setLastPick] = useState<Card | null>(null);
   const [selected, setSelected] = useState<Card | null>();
   const [gameMove, setGameMove] = useState<number>(0);
   const [pairsSolved, setPairsSolved] = useState(0);


   const handleClick = (card: Card) => {
      if (card.card.solved) return;

      setTotalMoves(ps => ps += 1);
      setSelected(card);

      if (gameMove === 0) setLastPick(card);

      if (gameMove === 1) {
         if (card.card.pairId === lastPick?.card.pairId && !card.card.solved) {
            setPairsSolved(ps => ps += 1);
            setLastPick(card => {
               if(card) card.card.solved =  true;
               return card;
            })
            
            setSelected(card => {
               if(card) card.card.solved =  true;
               return card;
            })
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
         <div className="title-container">
            <h1 className="title">Pairs Solved: {pairsSolved}</h1>
            <h1 className="title">Total Moves: {totalMoves}</h1>
         </div>
         <div className="gameboard">
            {shuffledData.map(card => {
               const cardClass = card.id === selected?.id || card.card.solved ? 'rotate card': 'card';

               return (
                  <div className="card-container">
                     <div className={cardClass} id={card.id.toString()} key={card.id} onClick={() => handleClick(card)}>
                        <img className="card__image" src={card.card.view}/> 
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default App
