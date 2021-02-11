import React, { Component } from 'react'

interface ChildProps {
    name:string, 
    gender: boolean, 
    height: number, 
    weight: number,
    currField: number, 
    genderSelected: boolean,
    isSubmitted: boolean
}

interface ComponentState {
    name:string, 
    gender: boolean, 
    height: number, 
    weight: number,
    currField: number, 
    genderSelected: boolean,
    isSubmitted: boolean
}

class BMICalc extends Component<ChildProps, ComponentState>{
    public constructor(props: ChildProps) {
        super(props);
        this.state = {
            name: this.props.name, 
            gender: this.props.gender, 
            height: this.props.height, 
            weight: this.props.weight, 
            currField: this.props.currField, 
            genderSelected: this.props.genderSelected,
            isSubmitted: this.props.isSubmitted
        };
        this.onChange = this.onChange.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 
        this.onChangeNum = this.onChangeNum.bind(this);
        this.changeGender = this.changeGender.bind(this);
    }

/*****************************************************************************/
// -----------------------------[ EVENT HANDLERS ]-----------------------------
/*****************************************************************************/

    private onChange( event:{ target: { name: any; value: any; } } ):void {
        const newState = { [event.target.name]: event.target.value } as Pick<ComponentState, keyof ComponentState>;
        this.setState( newState)
    } // end of onChange 

    private onChangeNum( event:{ target: { name: any; value: any; } } ):void {
        const newState = { [event.target.name]: parseFloat(event.target.value) } as Pick<ComponentState, keyof ComponentState>;
        this.setState( newState)
    } // end of onChangeNum

    private onSubmit(event:any):void {
        event.preventDefault()
        if (this.state.currField === 4) {
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

    // private hasChar(numStr: number) {
    //     console.log(numStr);
        
    //     let numStrHasChar = false 
    //     if ( !(/^[0.0-9.99]+$/ ).test( (numStr).toString() ) ) {
    //         numStrHasChar = true
    //     }
    //     console.log(numStrHasChar);
    //     return numStrHasChar
    // }

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

    private invalidHeightValidation(height:number): boolean { // aux method 
        console.log(height);
        let invalidHeight = false 
        if (height < 0.0 || height > 8.0 ) {
            invalidHeight = true 
        } else if ( height === 0 ) {
            invalidHeight = false 
        }
        // if ( this.hasChar(height) ) {
        //     invalidHeight = true 
        // } 
        if (isNaN(height)) invalidHeight = true 
        return invalidHeight
 
    } // end of invalidHeightValidation 

    private weightValidation(weight:number): boolean {// aux method
        let invalidWeight = false 
        if ( !(/^[0-9]+$/ ).test( (weight).toString() ) ) {
            invalidWeight = true
        }
        return invalidWeight
    } // end of weightValidation

/*****************************************************************************/
// ---------------------------------[ BTNS ]---------------------------------
/*****************************************************************************/

    private handleNxt = (): void => {
        if ( this.state.currField === 0 && this.state.name === '' || this.invalidNameValidation(this.state.name) ) { 
            // stop here 
        } else if ( this.state.currField === 1 && !this.state.genderSelected ) {
            // stop here 
        } else if ( this.state.currField === 2 && this.state.height === 0 || this.invalidHeightValidation(this.state.height)) {
            // stop here 
        } else if ( this.state.currField === 3 && this.state.weight === 0 ) {
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
        const bmiResult = this.state.weight / (this.state.height * this.state.height)
        if (this.state.currField === 0) { // name field and invalidNameValidation 
            if ( this.invalidNameValidation(this.state.name) ) {
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
                        <div>{ this.renderNameErrors() }</div>
                    </div>
            } else {
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
                </div>
            }
        } else if (this.state.currField === 1) { // gender drop-down menu
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
        } else if (this.state.currField === 2 ) { // height feild and heightValidation            
            if (  this.invalidHeightValidation(this.state.height) ) { // this happens 2nd 
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
                        <div>{this.renderHeightErrors()}</div>
                    </div>
            } else { // this happens 1st 
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
                        onChange={this.onChangeNum} // this is triggered 
                    />
                </div>
            }
        } else if ( this.state.currField === 3 ) { // weight field and weightValidation
            if ( this.weightValidation(this.state.weight) ) {
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
                    <div>{this.renderWeightErrors()}</div>
                </div>
            } else {
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
                    </div>

            }
        } else if ( this.state.currField === 4 ) { // review field and submit
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
            this.state.currField === 0 || 
            this.state.currField === 1 || 
            this.state.currField === 2 || 
            this.state.currField === 3 
        ) {
            nxtBtn = <button name="currField" onClick={this.handleNxt}>Next</button>
            prevBtn = <button name="currField" onClick={this.handlePrev}>Back</button>
        }
        if ( this.state.isSubmitted) bmiResultMsg = <p>congrates, your bmi is {bmiResult}</p>
        return (
            <div className="form-content-right">
                <form className="form" onSubmit={this.onSubmit}>
                    {result}
                    {bmiResultMsg}
                </form>
                {nxtBtn}
                {prevBtn}
            </div>
        )
    }
}

export default BMICalc