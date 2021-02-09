import React, { Component } from 'react'

interface ChildProps {
    name:string, 
    gender: boolean, 
    height: number, 
    weight: number
}

const initialState = {
    name: '', 
    gender: true, 
    height: null, 
    weight: null
}

class BMICalc extends Component<ChildProps, {}>{
    constructor(props: ChildProps) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this); 
        this.onSubmit = this.onSubmit.bind(this); 
    }

    onChange(event:any) {
        this.setState( { [event.target.name] : event.target.value } )
        // console.log();
        console.log(event.target.value);
    }

    onSubmit(event:any):void {
        event.preventDefault()
        console.log(this.state);
        console.log('submitted');
    }

    render() {
        return (
            <div className="form-content-right">
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
            </div>
        )
    }
}

export default BMICalc