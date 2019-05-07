import React, { Component } from 'react';
import './App.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const MOTS_A_DECOUVRIR = [
  'JOUER',
  'PAPILLON',
  'CHAISE',
  'SOLEIL',
  'DALEK',
  'CYBERMAN',
  'SONIC SCREWDRIVER',
  'THE DOCTOR',
  'OODS',
  'CLARA',
  'THE IMPOSSIBLE GIRL',
  'BAD WOLF'
]

class App extends Component {
  
  state = this.initialState()
  
  initialState()  {
    return {
      motATrouver: this.choisirMot(),
      motMasque: '_',
      lettresUtilisees: new Set(),
      alphabet: ALPHABET.split(""),
      tentatives: 0,
      erreur: ''
    }
  }

  choisirMot() {
    const idMot = Math.floor(Math.random() * MOTS_A_DECOUVRIR.length)
    return MOTS_A_DECOUVRIR[idMot]
  }

  cacherLettres() {
    const {motATrouver, lettresUtilisees} = this.state

    return motATrouver.replace(/\w/g,
      (lettre) => (lettresUtilisees.has(lettre) ? lettre : '_')
    )
  }

  handleLetterClick = letter => {
    const {motATrouver, lettresUtilisees, tentatives} = this.state
    if (!motATrouver.includes(letter)) {
      this.setState({erreur: 'erreur'})
      setTimeout(() => {
        this.setState({erreur: ''})
      }, 750)
    }

    this.setState({lettresUtilisees: lettresUtilisees.add(letter), motMasque: this.cacherLettres(), tentatives: tentatives + 1})
  }

  rejouerPartie = () => {
    this.setState(this.initialState)
  }

  render() {
    const {alphabet, motMasque, tentatives, erreur} = this.state
    const gagne = !motMasque.includes('_')
    return (
      <div className="App">
        <header className="App-header">
          <div className={`mot-a-trouver ${erreur}`}>{motMasque !== '_' ? motMasque : this.cacherLettres()}</div>
          <div className="alphabet">
          { gagne ?
          
            <div className="victoire">
              <button className="boutton" onClick={this.rejouerPartie}>rejouer</button>
              <p>Félicitation !! Vous avez trouvé le mot caché en {tentatives} tentatives!</p>
            </div> : 

            alphabet.map((letter, index) => {
              return <span className="letter" key={index} onClick={() => this.handleLetterClick(letter)}>{letter}</span>
          })}
          </div>    
        </header>
      </div>
    );
  }
}

export default App;
