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
    constructor(props: ChildProps) {
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
    }

    private onChange( event:{ target: { name: any; value: any; } } ):void {
        const newState = { [event.target.name]: event.target.value } as Pick<ComponentState, keyof ComponentState>;
        this.setState( newState )
        console.log(event.target.value);
    }

    onSubmit(event:any):void {
        event.preventDefault()
        console.log(this.state);
        console.log('submitted');
    }

    private handleNxt = () => {
        console.log(this.state);
        this.setState( // setState is async, does not update state right away 
            { currField: this.state.currField + 1 }, 
            () => { // opt cb func that can update state right away 
                console.log(this.state);
            }
        )
    }

    private handlePrev = () => {
        console.log(this.state);
        this.setState( // setState is async, does not update state right away 
            { currField: this.state.currField - 1 }, 
            () => { // opt cb func that can update state right away 
                console.log(this.state);
            }
        )
    }

    public render() {
        return (
            <div className="form-content-right">
                <h3>Jeff</h3>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-inputs">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input 
                            // id="name"
                            type="text" 
                            name="name"
                            className="form-input"
                            placeholder="Name"
                            onChange={this.onChange}
                            />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="gender" className="form-label">
                            Gender:
                        </label>
                        <input 
                            type="text" 
                            name="gender"
                            className="form-input"
                            placeholder="Gender"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="height" className="form-label">
                            Height:
                        </label>
                        <input 
                            type="text" 
                            name="height"
                            className="form-input"
                            placeholder="Height"
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="weight" className="form-label">
                            Weight:
                        </label>
                        <input 
                            type="text" 
                            name="weight"
                            className="form-input"
                            placeholder="Weight"
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="submit">Submit Form</button>
                </form>
                <button name="currField" onClick={this.handleNxt}>Next</button>
                <button name="currField" onClick={this.handlePrev}>Back</button>
            </div>
        )
    }
}

export default BMICalc