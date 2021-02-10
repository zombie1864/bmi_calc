import React, { Component } from 'react'

interface ChildProps {
    name:string, 
    gender: boolean, 
    height: number, 
    weight: number,
    currField: number
}

interface ComponentState {
    name:string, 
    gender: boolean, 
    height: number, 
    weight: number,
    currField: number
}

class BMICalc extends Component<ChildProps, ComponentState>{
    public constructor(props: ChildProps) {
        super(props);
        this.state = {
            name: this.props.name, 
            gender: this.props.gender, 
            height: this.props.height, 
            weight: this.props.weight, 
            currField: this.props.currField
        };
        this.onChange = this.onChange.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 
        this.onChangeNum = this.onChangeNum.bind(this);
    }

    private onChange( event:{ target: { name: any; value: any; } } ):void {
        const newState = { [event.target.name]: event.target.value } as Pick<ComponentState, keyof ComponentState>;
        this.setState( newState)
    } // end of onChange 

    private onChangeNum( event:{ target: { name: any; value: any; } } ):void {
        console.log('parseInt first ');
        const newState = { [event.target.name]: parseFloat(event.target.value) } as Pick<ComponentState, keyof ComponentState>;
        this.setState( newState)
    } // end of onChange 

    // private hasChar(numStr: number) {
    //     console.log(numStr);
        
    //     let numStrHasChar = false 
    //     if ( !(/^[0.0-9.99]+$/ ).test( (numStr).toString() ) ) {
    //         numStrHasChar = true
    //     }
    //     console.log(numStrHasChar);
    //     return numStrHasChar
    // }

    private nameValidation(name:string) { // aux method
        let inValidName = false 
        const emailUrlsAndSymbols = ['.com', '.co', '.io', '.net', '.edu', '@', '.']

        if (name.indexOf(' ') === 0) inValidName = true
        emailUrlsAndSymbols.forEach( el => {
            if ( name.includes(el) ) inValidName = true
        })
        return inValidName
    } // end of nameValidation 

    private heightValidation(height:number) {
        let invalidHeight = false 
        // if ( this.hasChar(height) ) {
        //     invalidHeight = true 
        // } 
        if (isNaN(height)) invalidHeight = true 
        return invalidHeight
 
    }

    private weightValidation(weight:number) {
        let invalidWeight = false 
        if ( !(/^[0-9]+$/ ).test( (weight).toString() ) ) {
            invalidWeight = true
        }
        return invalidWeight
    }

    private onSubmit(event:any):void {
        event.preventDefault()
        if (this.state.currField === 3) {
            console.log(this.state);
            console.log('submitted');
        } else {
            console.log('cannot submit');
        }
    }

    private handleNxt = () => {
        // let proceedToNxt = false 
        // if ( this.nameValidation(this.state.name) ) {
            this.setState( // setState is async, does not update state right away 
                { currField: this.state.currField + 1 }, 
                () => { // opt cb func that can update state right away 
                    // console.log(this.state);
                }
            )
        //     proceedToNxt = true 
        // }
        // return proceedToNxt
        // console.log(this.state);
    } // end of handleNxt 

    private handlePrev = () => {
        console.log(this.state);
        this.setState( // setState is async, does not update state right away 
            { currField: this.state.currField - 1 }, 
            () => { // opt cb func that can update state right away 
                console.log(this.state);
            }
        )
    }

    private renderNameErrors() {
        return (
            <p>Please enter a valid name</p>
        )
    }

    private renderHeightErrors() {
        return (
            <p>Please enter a valid height</p>
        )
    }
    private renderWeightErrors() {
        return (
            <p>Please enter a valid weight</p>
        )
    }

    public render() {
        let result
        if (this.state.currField === 0) { // name field and nameValidation 
            if (this.nameValidation(this.state.name)) {
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
                    <select name="gender" className="genderOpt">
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                    </select>
                </div>
        } else if (this.state.currField === 2 ) { // height feild and heightValidation            
            if (  this.heightValidation(this.state.height) ) { // this happens 2nd 
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
        } else if ( this.state.currField === 3 ) {
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
                        <button type="submit" className="submit">Submit Form</button>
                    </div>

            }
        } 
        return (
            <div className="form-content-right">
                <form className="form" onSubmit={this.onSubmit}>
                    {result}
                </form>
                <button name="currField" onClick={this.handleNxt}>Next</button>
                <button name="currField" onClick={this.handlePrev}>Back</button>
            </div>
        )
    }
}

export default BMICalc