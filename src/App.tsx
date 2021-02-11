import BMICalcOld from './components/BMI_calc'
import React from 'react'

interface Istate {
  name: string, 
  gender: boolean, 
  height: number, 
  weight: number,
  currField: number, 
  genderSelected: boolean, 
  isSubmitted: boolean
}

class BMICalc extends React.Component { 
  state: Istate = { // global state, initialState
    name: '', 
    gender: true, // using boolean for gender male: true female: false 
    height: 0, 
    weight: 0,
    currField: 0, 
    genderSelected: false, 
    isSubmitted: false 
  }
  render() {
    const BMICalcProps = { 
      name: this.state.name, 
      gender: 
      this.state.gender, 
      height: this.state.height, 
      weight: this.state.weight, 
      currField: this.state.currField, 
      genderSelected: this.state.genderSelected,  
      isSubmitted: this.state.isSubmitted
    } // look into why this works 
    return (
      <div className="App">
        <h1>BMI Calculator</h1> {/* this is a comment*/}
        <BMICalcOld {...BMICalcProps}/> {/* this is how you embed comp to the main app*/}
      </div>
    );
  }
}

export default BMICalc;
