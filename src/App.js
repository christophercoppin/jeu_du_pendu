import React, { Component, useState } from 'react';
import './App.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const WORDS_TO_FIND = [
  'DALEK',
  'CYBERMAN',
  'SONIC SCREWDRIVER',
  'THE DOCTOR',
  'OODS',
  'CLARA',
  'THE IMPOSSIBLE GIRL',
  'BAD WOLF'
]

function App() {
  const [wordToFind, setWordToFind] = useState(randomWord())
  const [hiddenWord, setHiddenWord] = useState('_')
  const [usedLetters, setUsedLetters] = useState(new Set())
  const [guesses, setGuesses] = useState(0)
  const [fail, setFail] = useState('')

  function initialState()  {
    setWordToFind(randomWord())
    setHiddenWord('_')
    setUsedLetters(new Set())
    setGuesses(0)
    setFail('')
  }
  
  function randomWord() {
    const idMot = Math.floor(Math.random() * WORDS_TO_FIND.length)
    return WORDS_TO_FIND[idMot]
  }
  
  function hiddeLetters() {
    return wordToFind.replace(/\w/g,
      (lettre) => (usedLetters.has(lettre) ? lettre : '_')
    )
  }
  
  function handleLetterClick(letter) {
    if (!wordToFind.includes(letter)) {
      setFail('erreur')
      setTimeout(() => {
        setFail('')
      }, 750)
    }
  
    setUsedLetters(usedLetters.add(letter))
    setHiddenWord(hiddeLetters())
    setGuesses(guesses + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className={`mot-a-trouver ${fail}`}>{hiddenWord !== '_' ? hiddenWord : hiddeLetters()}</div>
        <div className="alphabet">
        { !hiddenWord.includes('_') ?
        
          <div className="victoire">
            <button className="boutton" onClick={initialState}>rejouer</button>
            <p>Félicitation !! Vous avez trouvé le mot caché en {guesses} tentatives!</p>
          </div> : 

          ALPHABET.split("").map((letter, index) => {
            return <span className="letter" key={index} onClick={() => handleLetterClick(letter)}>{letter}</span>
        })}
        </div>    
      </header>
    </div>
  );
}

export default App;
