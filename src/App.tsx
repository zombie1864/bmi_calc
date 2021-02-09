import BMI_calc from './components/BMI_calc'
import React from 'react'

interface Istate {
  name: string, 
  gender: boolean, 
  height: number, 
  weight: number
}

class App extends React.Component { 
  state: Istate = { // global state 
    name: 'jeff', 
    gender: true, // using boolean for gender male: true female: false 
    height: 5.11, 
    weight: 202
  }
  render() {
    const BMI_calcProps = { name: this.state.name}
    return (
      <div className="App">
        <h1>BMI_Calc App</h1> {/* this is a comment*/}
        <BMI_calc {...BMI_calcProps}/> {/* this is how you embed comp to the main app*/}
        <p>My name is {this.state.name} i am { this.state.gender ? 'male' : 'female'}, i am {this.state.height} tall and my weight is {this.state.weight}</p>
      </div>
    );
  }
}

export default App;
