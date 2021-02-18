import React from 'react'
import { invalidNameValidation, invalidNumberValidation } from './validators'

interface Istate {
  name: string, 
  gender: boolean, 
  height: number, 
  weight: number,
  currField: number, 
  allowNext: boolean, 
  genderSelected: boolean, 
  isSubmitted: boolean, 
  value: string// Possibily the solution 
}

class App extends React.Component<{}, Istate> { 
  public constructor(props: Istate) {
      super(props);
      this.state = {
          name: '', 
          gender: true, 
          height: 3.0, 
          weight: 60, 
          currField: 0, 
          allowNext: true, 
          genderSelected: false,
          isSubmitted: false, 
          value: ''// Possibily the solution 
      };
      this.onChange = this.onChange.bind(this); 
  }

/*****************************************************************************/
// -----------------------------[ EVENT HANDLERS ]-----------------------------
/*****************************************************************************/

  private onChange( event:{ target: { name: any; value: any; } } ):void {
    // EXPERIMENTAL 
    let name = event.target.name 
    let value = event.target.value 
    console.log(name, 'the value being collected by user input is:', value );
    // let diffState = { [name]:value } as Pick<Istate, keyof Istate>;
    // this.setState({ [name]: value } as Istate );
    // this.setState({ value: value } );
    // EXPERIMENTAL 
    if ( this.state.currField !== 1 ) {
      const newState = { [event.target.name]: parseFloat(event.target.value) } as Pick<Istate, keyof Istate>;
      this.setState( newState ) // updates state for either height or weight 
    } else if ( this.state.currField === 1 ) {
      this.setState( { name: event.target.value } ) // updates state only for name 
    }
    if ( this.state.currField === 2 && event.target.value === 'true' ) {
      this.setState({ gender: event.target.value });
      this.setState({ genderSelected: true } )
    } else if ( this.state.currField === 2 && event.target.value === 'false' ) {
      this.setState({ gender: event.target.value });
      this.setState({ genderSelected: true } )
    }
  } // end of onChange 
  
/*****************************************************************************/
// ---------------------------------[ BTNS ]---------------------------------
/*****************************************************************************/

  private handleOnClick = (event: any): void => { // onClicks have events 
    if (event.target.value === 'back') this.setState( {currField: this.state.currField - 1 } ) 
    if ( 
      this.state.allowNext === invalidNameValidation(this.state.name) ||
      this.state.allowNext ===  invalidNumberValidation(this.state.height, this.state.weight) || 
      ( this.state.currField === 1 && this.state.name === '' ) || 
      ( this.state.currField === 2 && !this.state.genderSelected ) ||
      ( this.state.currField === 3 && this.state.height === 3.0 )|| 
      ( this.state.currField === 4 && this.state.weight === 60 )
    ) return 
    if (event.target.value === 'nxt') this.setState( {currField: this.state.currField + 1 } )
  } // end of handleNxt 

/*****************************************************************************/
// ---------------------------------[ ERR ]---------------------------------
/*****************************************************************************/

  private renderErrors():any { // renders err
    let errMsg
    if ( invalidNameValidation(this.state.name) ) {
      errMsg = <p>Please enter a valid name</p>
    } else if (invalidNumberValidation(this.state.height, this.state.weight)) {
      errMsg =  <p>Please enter a valid height</p>
    } else if (invalidNumberValidation(this.state.height, this.state.weight)) {
      errMsg =  <p>Please enter a valid weight</p>
    }
      return (
        errMsg
      )
  }

/*****************************************************************************/
// ------------------------------[ AUX METHODS ]------------------------------
/*****************************************************************************/

  private htmlResult(currField:number):any {
    const formFields = ['name', 'gender', 'height', 'weight']; 
    const genderTypes = [
      { value: 'true', label: 'Male' },
      { value: 'false', label: 'Female' }
    ]
    let htmlRes
    let idx = currField - 1 
    if ( idx === 1 ) {
      htmlRes = 
          <div>
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select name="gender" className="genderOpt" onChange={this.onChange}>
              <option> -- select an option -- </option>
              {genderTypes.map(({ value, label }) => <option value={value}  key = { value }>{label}</option>)}
            </select>
          </div>
    } else {
      htmlRes = 
          <div>
            <label htmlFor={`${formFields[idx]}`} className="form-label">
              {formFields[idx][0].toUpperCase() + formFields[idx].slice(1,formFields[idx].length)}:
            </label>
            <input 
              type="text" 
              name={`${formFields[idx]}`}
              placeholder={`${formFields[idx][0].toUpperCase() + formFields[idx].slice(1,formFields[idx].length)}`}
              onChange={this.onChange}
              value={this.state.value} // Possibily the solution 
              // value={this.state.name} // Possibily the solution 
              // value={this.state.height} // Possibily the solution 
              // value={this.state.weight} // Possibily the solution 
              />
              { invalidNameValidation(this.state.name) ? 
              <div>{ this.renderErrors() }</div> 
              : invalidNumberValidation(this.state.height, this.state.weight) ?
              <div>{this.renderErrors()}</div> 
              : <div></div>}
          </div>
    }
    return htmlRes
  }

  private bmiResult(height:number, weight:number):number {
    return 703 * ( ( weight) / ( (12 * height) ** 2 ) )
  }

/*****************************************************************************/
// ---------------------------------[ RENDER ]---------------------------------
/*****************************************************************************/

  public render():JSX.Element {
      let intro 
      let result
      let nxtBtn 
      let prevBtn 
      let bmiResultMsg
      let homeBtn
      if (this.state.currField === 0) {
          intro = 
              <div>
                  <p>Greetings and welcome to BMI Calculator</p>
                  <p>Press next to enter your info to calcuate your bmi</p>
              </div>
      // EXPERIMENTAL_SECTION => THIS REMOVES BUGGY BEHAVIOR 
      // } else if (this.state.currField === 4) {
      //   result = <div>{this.htmlResult(this.state.currField)}</div>
      // EXPERIMENTAL_SECTION => THIS REMOVES BUGGY BEHAVIOR 
      } else if ( this.state.currField === 5 ) { // review field and submit
          result = 
              <div>
                  <p>Name: { this.state.name }</p>
                  <p>Gender: { this.state.gender ? 'Male' : 'Female'}</p>
                  <p>Height: { this.state.height }</p>
                  <p>Weight: { this.state.weight }</p>
                  <p>congrates, your bmi is {this.bmiResult(this.state.height, this.state.weight)}</p>
              </div> 
      } else {
        result = this.htmlResult(this.state.currField)
      }
      if ( this.state.currField === 0 ) {
        nxtBtn = <button name="currField" value="nxt" onClick={this.handleOnClick}>Next</button>
      } else if ( // shows btns based on currField 
          this.state.currField === 1 || 
          this.state.currField === 2 || 
          this.state.currField === 3 || 
          this.state.currField === 4 
      ) {
          nxtBtn = <button name="currField" value="nxt" onClick={this.handleOnClick}>Next</button>
          prevBtn = <button name="currField" value="back" onClick={this.handleOnClick}>Back</button>
      } 
      return ( // rendering happens here 
          <div className="form-content-right">
              <form className="form">
                  {intro}
                  {result}
                  {bmiResultMsg}
                  {homeBtn}
              </form>
              {nxtBtn}
              {prevBtn}
          </div>
      ) // rendering happens here 
  }
}

export default App;
