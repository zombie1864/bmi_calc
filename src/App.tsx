import BMICalc from './components/BMI_calc'
import React from 'react'

interface Istate {
  name: string, 
  gender: boolean, 
  height: number, 
  weight: number,
  currField: number, 
  genderSelected: boolean
}

class App extends React.Component { 
  state: Istate = { // global state, initialState
    name: '', 
    gender: true, // using boolean for gender male: true female: false 
    height: 0, 
    weight: 0,
    currField: 0, 
    genderSelected: false 
  }
  render() {
    const BMICalcProps = { name: this.state.name, gender: this.state.gender, height: this.state.height, weight: this.state.weight, currField:this.state.currField, genderSelected:this.state.genderSelected } // look into why this works 
    return (
      <div className="App">
        <h1>BMI Calculator</h1> {/* this is a comment*/}
        <BMICalc {...BMICalcProps}/> {/* this is how you embed comp to the main app*/}
      </div>
    );
  }
}

export default App;
