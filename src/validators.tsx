export const invalidNameValidation = (name:string):boolean => { // aux method
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

export const invalidNumberValidation = (
    height:number, 
    weight:number,
    miniHeight:number = 3.0, 
    maxHeight:number = 8.0, 
    miniWeight:number = 60, 
    maxWeight:number = 600
  ): boolean => { // aux method 
    let invalidNumber = false 
    if (height < miniHeight || height > maxHeight ) invalidNumber = true 
    if (isNaN(height)) invalidNumber = true 
    if (weight < miniWeight || weight > maxWeight ) invalidNumber = true 
    if ( isNaN(weight) ) invalidNumber = true
    return invalidNumber

} // end of invalidNumberValidation
