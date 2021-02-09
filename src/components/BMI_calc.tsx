import React, { Component } from 'react'
interface ChildProps {
    name:string 
}

class BMI_calc extends Component<ChildProps, {}>{
//     constructor(props : ChildProps){
//     	super(props)
//   }
    render() {
        console.log(this.props.name);
        return (
            <div>
                <p>hello world my name is {this.props.name}</p>
            </div>
        )
    }
}

export default BMI_calc