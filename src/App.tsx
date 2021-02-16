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

class App extends React.Component<{}, Istate> { 
  private baseState: object
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
      this.baseState = this.state
      this.onChange = this.onChange.bind(this); 
      this.onSubmit = this.onSubmit.bind(this); 
      this.onChangeNum = this.onChangeNum.bind(this);
      this.changeGender = this.changeGender.bind(this);
  }

/*****************************************************************************/
// -----------------------------[ EVENT HANDLERS ]-----------------------------
/*****************************************************************************/

  private onChange( event:{ target: { name: any; value: any; } } ):void {
      const newState = { [event.target.name]: event.target.value } as Pick<Istate, keyof Istate>;
      this.setState( newState)
  } // end of onChange 

  private onChangeNum( event:{ target: { name: any; value: any; } } ):void {
      const newState = { [event.target.name]: parseFloat(event.target.value) } as Pick<Istate, keyof Istate>;
      this.setState( newState)
  } // end of onChangeNum

  private onSubmit(event:any):void {
      event.preventDefault()
      if (this.state.currField === 5) {
          console.log(this.state);
          console.log('submitted');
      } else {
          console.log('cannot submit');
      }
      this.setState({ isSubmitted: true })
  } // end of onSubmit 

  private changeGender(event:any):void {
      if ( event.target.value === 'true') {
          this.setState({ gender: true });
          this.setState({ genderSelected: true })
      } else {
          this.setState({ gender: false });
          this.setState({ genderSelected: true })
      }
  } // end of changeGender 

/*****************************************************************************/
// ----------------------------[ FORM VALIDATION ]----------------------------
/*****************************************************************************/

  private invalidNameValidation(name:string): boolean { // aux method
      let inValidName = false 
      const emailUrlsAndSymbols = ['.com', '.co', '.io', '.net', '.edu', '@', '.']

      if (name.indexOf(' ') === 0) inValidName = true
      emailUrlsAndSymbols.forEach( el => {
          if ( name.includes(el) ) inValidName = true
      })
      if ( (/^[0-9]+$/ ).test( (name) ) ) {
          inValidName = true
      }
      return inValidName
  } // end of invalidNameValidation 

  private invalidNumberValidation(
      height:number, 
      weight:number,
      miniHeight:number = 3.0, 
      maxHeight:number = 8.0, 
      miniWeight:number = 60, 
      maxWeight:number = 600
    ): boolean { // aux method 
      let invalidNumber = false 
      if (height < miniHeight || height > maxHeight ) invalidNumber = true 
      if (isNaN(height)) invalidNumber = true 
      if (weight < miniWeight || weight > maxWeight ) invalidNumber = true 
      if ( isNaN(weight) ) invalidNumber = true
      return invalidNumber

  } // end of invalidNumberValidation

/*****************************************************************************/
// ---------------------------------[ BTNS ]---------------------------------
/*****************************************************************************/

  private handleNxt = (): void => {
      if ( ( this.state.currField === 1 && this.state.name === '') || this.invalidNameValidation(this.state.name) ) { 
          // stop here 
      } else if ( this.state.currField === 2 && !this.state.genderSelected ) {
          // stop here 
      } else if ( this.state.currField === 3 && this.invalidNumberValidation(this.state.height, this.state.weight)) {
          // stop here 
      } else if ( this.state.currField === 4 && this.invalidNumberValidation(this.state.height, this.state.weight) ) {
          // stop here 
      } else {
          this.setState( // setState is async, does not update state right away 
              { currField: this.state.currField + 1 }, 
              () => { // opt cb func that can update state right away 
              }
          )
      }
  } // end of handleNxt 

  private handlePrev = (): void => {
      console.log(this.state);
      this.setState( // setState is async, does not update state right away 
          { currField: this.state.currField - 1 }, 
          () => { // opt cb func that can update state right away 
              console.log(this.state);
          }
      )
  } // end of handlePrev 

  private handleHome = (): void => {
      this.setState( 
          this.baseState, 
          () => {
              console.log(this.state);  
          }
      )
  } // end of handleHome

/*****************************************************************************/
// ---------------------------------[ ERR ]---------------------------------
/*****************************************************************************/

  private renderNameErrors():JSX.Element { // renders err
      return (
          <p>Please enter a valid name</p>
      )
  }

  private renderHeightErrors():JSX.Element { // renders err
      return (
          <p>Please enter a valid height</p>
      )
  }

  private renderWeightErrors():JSX.Element { // renders err
      return (
          <p>Please enter a valid weight</p>
      )
  }

/*****************************************************************************/
// ---------------------------------[ RENDER ]---------------------------------
/*****************************************************************************/

  public render():JSX.Element {
      let result
      let nxtBtn 
      let prevBtn 
      let bmiResultMsg
      let homeBtn
      const bmiResult = 703 * ( this.state.weight / ( ( this.state.height* 12 ) * ( this.state.height * 12 ) ) ) 
      if (this.state.currField === 0) {
          result = 
              <div>
                  <p>Greetings and welcome to BMI Calculator</p>
                  <p>Press next to enter your info to calcuate your bmi</p>
              </div>
      } else if (this.state.currField === 1) { // name field and invalidNameValidation 
          result = 
              <div className="form-inputs">
                  <label htmlFor="name" className="form-label">
                      Name:
                  </label>
                  <input 
                      type="text" 
                      name="name"
                      className="form-input"
                      placeholder="Name"
                      onChange={this.onChange}
                      />
                      {this.invalidNameValidation(this.state.name) ? <div>{ this.renderNameErrors() }</div> : <div></div>}
              </div>
      } else if (this.state.currField === 2) { // gender drop-down menu
          result = 
              <div className="form-inputs">
                  <label htmlFor="gender" className="form-label">
                      Gender:
                  </label>
                  <select name="gender" className="genderOpt" onChange={this.changeGender}>
                      <option> -- select an option -- </option>
                      <option value='true'>Male</option>
                      <option value='false'>Female</option>
                  </select>
              </div>
      } else if (this.state.currField === 3 ) { // height feild and heightValidation 
              result = 
                  <div className="form-inputs">
                      <label htmlFor="height" className="form-label">
                          Height:
                      </label>
                      <input 
                          type="text" 
                          name="height"
                          className="form-input"
                          placeholder="Height"
                          onChange={this.onChangeNum}
                      />
                      <div>{ this.invalidNumberValidation(this.state.height, this.state.weight) ? <div>{this.renderHeightErrors()}</div> : <div></div> }</div>
                  </div>
      } else if ( this.state.currField === 4 ) { // weight field and weightValidation
          result = 
          <div>
              <div className="form-inputs">
                  <label htmlFor="weight" className="form-label">
                      Weight:
                  </label>
                  <input 
                      type="text" 
                      name="weight"
                      className="form-input"
                      placeholder="Weight"
                      onChange={this.onChangeNum}
                  />
              </div>
              <div>{ this.invalidNumberValidation(this.state.height, this.state.weight) ? this.renderWeightErrors() : <div></div> }</div>
          </div>
      } else if ( this.state.currField === 5 ) { // review field and submit
          result = 
              <div>
                  <p>Name: { this.state.name }</p>
                  <p>Gender: { this.state.gender ? 'Male' : 'Female'}</p>
                  <p>Height: { this.state.height }</p>
                  <p>Weight: { this.state.weight }</p>
                  <button type="submit" className="submit">Submit Form</button>
              </div> 
      }
      if ( // shows btns based on currField 
          this.state.currField === 1 || 
          this.state.currField === 2 || 
          this.state.currField === 3 || 
          this.state.currField === 4 
      ) {
          nxtBtn = <button name="currField" onClick={this.handleNxt}>Next</button>
          prevBtn = <button name="currField" onClick={this.handlePrev}>Back</button>
      } else {
        nxtBtn = <button name="currField" onClick={this.handleNxt}>Next</button>
      }
      if ( this.state.isSubmitted) bmiResultMsg = <p>congrates, your bmi is {bmiResult}</p>
      if ( this.state.isSubmitted) homeBtn = <button name="currField" onClick={this.handleHome}>Home</button>
      return (
          <div className="form-content-right">
              <form className="form" onSubmit={this.onSubmit}>
                  {result}
                  {bmiResultMsg}
                  {homeBtn}
              </form>
              {nxtBtn}
              {prevBtn}
          </div>
      )
  }
}

export default App;
