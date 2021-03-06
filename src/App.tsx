import React from 'react'
import { invalidNameValidation, invalidNumberValidation } from './validators'

interface Istate {
  formFields: 
    {
      name: string, 
      gender: string, 
      height: string, 
      weight: string
    }[]
  , 
  currField: number, 
  genderSelected: boolean
}

class App extends React.Component<{}, Istate> { 
  public constructor(props: Istate) {
    super(props);
    this.state = {
      formFields: [ 
        {
        name: '', 
        gender: '', 
        height: '', 
        weight: '' 
        }
      ],
        currField: 0, 
        genderSelected: false 
    };
}

// in the future invalidNumberValidation should accept a single arg 

/*****************************************************************************/
// -----------------------------[ EVENT HANDLERS ]-----------------------------
/*****************************************************************************/

  private onChange = ( event:any ):void => { 
    const newArr = [...this.state.formFields] // newState = { [event.target.name]: (event.target.value) } as Istate;
    newArr[0] = { ...newArr[0], [event.target.name]: (event.target.value) }
    this.setState( { formFields: newArr}, () => { // cb func -> does further logic regarding on trg value 
      if ( event.target.value === 'true' || event.target.value === 'false' ) this.setState({ genderSelected: true } )
      if ( isNaN(parseFloat(event.target.value)) ) { // this is triggered for either type of input 
        return // if type={number} the effect is to return '' from value={this.state.height} 
      } else if (!invalidNumberValidation(this.state.formFields[0].height, this.state.formFields[0].weight)) {
        this.setState( {[event.target.name]: parseFloat(event.target.value)} as Pick<Istate, keyof Istate>)
      }
    }) 
  } // end of onChange 
  
/*****************************************************************************/
// ---------------------------------[ BTNS ]---------------------------------
/*****************************************************************************/

private handleOnClick = (event: any): void => { // onClicks have events   
  if (invalidNameValidation(this.state.formFields[0].name) || invalidNumberValidation(this.state.formFields[0].height, this.state.formFields[0].weight)) return 
  if (event.target.value === 'back') this.setState( {currField: this.state.currField - 1 } ) 
  if ( 
    ( this.state.currField === 1 && this.state.formFields[0].name === '' ) || 
    ( this.state.currField === 2 && !this.state.genderSelected ) ||
    ( this.state.currField === 3 && this.state.formFields[0].height === '' )|| 
    ( this.state.currField === 4 && this.state.formFields[0].weight  === '' )
  ) return 
  if (event.target.value === 'nxt') this.setState( {currField: this.state.currField + 1 } )
  } // end of handleNxt 

/*****************************************************************************/
// ---------------------------------[ ERR ]---------------------------------
/*****************************************************************************/

  private renderErrors():any { // renders err
    let errMsg
    if ( invalidNameValidation(this.state.formFields[0].name) ) {
      errMsg = <p>Please enter a valid name</p>
    } else if (invalidNumberValidation(this.state.formFields[0].height, this.state.formFields[0].weight) && this.state.currField === 3 ) {
      errMsg =  <p>Please enter a valid height between 3.0 and 8.0 ft </p>
    } else if (invalidNumberValidation(this.state.formFields[0].height, this.state.formFields[0].weight) && this.state.currField === 4 ) {
      errMsg =  <p>Please enter a valid weight between 60 and 600 lbs</p>
    } 
      return (
        errMsg
      )
  }

/*****************************************************************************/
// ------------------------------[ AUX METHODS ]------------------------------
/*****************************************************************************/

  private htmlResult(currField:number):any {
    const formFields = Object.keys(this.state.formFields[0])
    const genderTypes = [
      { value: 'notSelected', label: '-- select an option --' },
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
            <select name="gender" className="genderOpt" onChange={this.onChange} value={this.state.formFields[0].gender}>
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
              type={ idx === 0 ? "text" : 'number'}
              step={ idx !== 0 ? '0.01' : ''}
              name={`${formFields[idx]}`}
              placeholder={`${formFields[idx][0].toUpperCase() + formFields[idx].slice(1,formFields[idx].length)}`}
              onChange={this.onChange}
              value={ 
                idx === 0 ? this.state.formFields[0].name : 
                idx === 2 ? this.state.formFields[0].height :
                this.state.formFields[0].weight
              }
              />
              { invalidNameValidation(this.state.formFields[0].name) ? 
              <div>{ this.renderErrors() }</div> 
              : invalidNumberValidation(this.state.formFields[0].height, this.state.formFields[0].weight) ?
              <div>{this.renderErrors()}</div> 
              : <div></div>}
          </div>
    }
    return htmlRes
  }

  private bmiResult(height:number, weight:number):number {
    return Math.round( 703 * ( ( weight) / ( (12 * height) ** 2 ) ) ) 
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
              nxtBtn = <button name="currField" value="nxt" onClick={this.handleOnClick}>Next</button>
      } else if ( this.state.currField === 5 ) { // review field and submit
          result = // generates the p tags on the result section 
              <div>
                {Object.entries(this.state.formFields[0]).map( (keyValueArrPair, idx) => (
                  <p key = { idx }> 
                    {keyValueArrPair[0][0].toUpperCase() + keyValueArrPair[0].slice(1) + ': '}
                    { keyValueArrPair[1] === 'true' ? 'Male' : 
                      keyValueArrPair[1] === 'false' ? 'Female' : 
                      keyValueArrPair[1] }
                  </p>
                ))}
                  <p>congrates, your bmi is {this.bmiResult(parseFloat(this.state.formFields[0].height), parseFloat(this.state.formFields[0].weight))}</p>
              </div> 
      } else {
        result = this.htmlResult(this.state.currField)
        nxtBtn = <button name="currField" value="nxt" onClick={this.handleOnClick}>Next</button>
        prevBtn = <button name="currField" value="back" onClick={this.handleOnClick}>Back</button>
      }
      
      return ( // rendering happens here JSX 
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
      ) // rendering happens here JSX 
  }
}

export default App;