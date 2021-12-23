import { useReducer } from 'react'
import './App.css'

const data = [{
  id: 1,
  card: 'X'
}, {
  id: 2,
  card: 'Y'
},];

interface gameState {
  totalMoves: number;
  firstPick: ({ id: number, card: string; } | null),
  secondPick: ({ id: number, card: string; } | null),
}

const initialState: gameState = {
  totalMoves: 0,
  firstPick: null,
  secondPick: null
}

function gameReducer(state: gameState , action: {type: string, action: null}) {
  return state;
}

function App() {  
  const [gameState, dispatch] = useReducer(gameReducer, initialState)

  return (
    <div className="App">
    </div>
  )
}

export default App
