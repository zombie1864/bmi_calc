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
    height:string, 
    weight:string,
    miniHeight:number = 3.0, 
    maxHeight:number = 8.0, 
    miniWeight:number = 60, 
    maxWeight:number = 600
  ): boolean => { // aux method 
    // console.log(height, weight);
    
    let invalidNumber = false 
    if (height === '' || weight === '') invalidNumber = false 
    let heightNum = parseFloat(height), 
        weightNum = parseFloat(weight)
    if (heightNum < miniHeight || heightNum > maxHeight ) invalidNumber = true 
    if (isNaN(heightNum) && height !== '') invalidNumber = true 
    if (weightNum < miniWeight || weightNum > maxWeight ) invalidNumber = true 
    if ( isNaN(weightNum) && weight !== '') invalidNumber = true
    return invalidNumber

} // end of invalidNumberValidation
