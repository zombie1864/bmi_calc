import React from 'react'
import { invalidNameValidation, invalidNumberValidation } from './validators'

interface Istate {
  name: string, 
  gender: boolean, 
  height: number, 
  weight: number,
  currField: number, 
  genderSelected: boolean, 
  isSubmitted: boolean
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
          genderSelected: false,
          isSubmitted: false
      };
      this.onChange = this.onChange.bind(this); 
  }

/*****************************************************************************/
// -----------------------------[ EVENT HANDLERS ]-----------------------------
/*****************************************************************************/

  private onChange( event:{ target: { name: any; value: any; } } ):void {
    if ( this.state.currField !== 1 ) {
      const newState = { [event.target.name]: parseFloat(event.target.value) } as Pick<Istate, keyof Istate>;
      this.setState( newState ) // updates state for either height or weight 
    } else if ( this.state.currField === 1 ) {
      this.setState( { name: event.target.value } ) // updates state only for name 
    }
    if ( this.state.currField === 2 && event.target.value === 'true' ) {
      this.setState({ gender: true });
      this.setState({ genderSelected: true } )
    } else if ( this.state.currField === 2 && event.target.value === 'false' ) {
      this.setState({ gender: false });
      this.setState({ genderSelected: true } )
    }
  } // end of onChange 
  
/*****************************************************************************/
// ---------------------------------[ BTNS ]---------------------------------
/*****************************************************************************/

  private handleOnClick = (event: any): void => { // onClicks have events 
    if ( ( this.state.currField === 1 && this.state.name === '') || invalidNameValidation(this.state.name) ) { 
        // stop here 
    } else if ( this.state.currField === 2 && !this.state.genderSelected ) {
        // stop here 
    } else if ( 
        this.state.currField === 3 && 
        this.state.height === 3.0 ||
        invalidNumberValidation(this.state.height, this.state.weight) 
      ) {
        // stop here 
    } else if ( 
        this.state.currField === 4 && 
        this.state.weight === 60 || 
        invalidNumberValidation(this.state.height, this.state.weight) 
      ) {
        // stop here 
    } else if (event.target.value === 'nxt') this.setState( {currField: this.state.currField + 1 } )  
    if (event.target.value === 'back') this.setState( {currField: this.state.currField - 1 } ) 
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
  const genderTypes = ['female', 'male', 'unknown']
  let htmlRes
  let idx = currField - 1 
  if ( idx === 1 ) {
    genderTypes.map( gender => {
      // WORK ON THIS 
    })
    htmlRes = 
        <div>
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select name="gender" className="genderOpt" onChange={this.onChange}>
            <option> -- select an option -- </option>
            <option value='true'>Male</option>
            <option value='false'>Female</option>
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
            />
        </div>
  }
  return htmlRes
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
      const bmiResult = 703 * ( this.state.weight / ( ( this.state.height* 12 ) * ( this.state.height * 12 ) ) ) 
      if (this.state.currField === 0) {
          intro = 
              <div>
                  <p>Greetings and welcome to BMI Calculator</p>
                  <p>Press next to enter your info to calcuate your bmi</p>
              </div>
      } else if (this.state.currField === 1) { // name field and invalidNameValidation 
          result = 
              <div className="form-inputs">
                {this.htmlResult(this.state.currField)}
                {invalidNameValidation(this.state.name) ? <div>{ this.renderErrors() }</div> : <div></div>}
              </div> 
      } else if (this.state.currField === 2) { // gender drop-down menu
        result = 
              <div className="form-inputs">
                {this.htmlResult(this.state.currField)}
              </div>
      } else if (this.state.currField === 3 ) { // height feild and heightValidation 
              result =  
                  <div className="form-inputs">
                      {this.htmlResult(this.state.currField)}
                      <div>{ invalidNumberValidation(this.state.height, this.state.weight) ? <div>{this.renderErrors()}</div> : <div></div> }</div>
                  </div> 
      } else if ( this.state.currField === 4 ) { // weight field and weightValidation
          result = 
          <div>
              <div className="form-inputs">
                {this.htmlResult(this.state.currField)}
              </div>
              <div>{ invalidNumberValidation(this.state.height, this.state.weight) ? this.renderErrors() : <div></div> }</div>
          </div>
      } else if ( this.state.currField === 5 ) { // review field and submit
          result = 
              <div>
                  <p>Name: { this.state.name }</p>
                  <p>Gender: { this.state.gender ? 'Male' : 'Female'}</p>
                  <p>Height: { this.state.height }</p>
                  <p>Weight: { this.state.weight }</p>
                  <p>congrates, your bmi is {bmiResult}</p>
              </div> 
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
