import { invalidNameValidation, invalidNumberValidation } from './validators'

test('Name should receive a string as props and return false', async () => {
    expect(invalidNameValidation('jeff')).toBe(false)
})
test('If name contains . or @ symbol, function should return true, invalid name', async () => {
    expect(invalidNameValidation('jeff.')).toBe(true)
    expect(invalidNameValidation('jeff@')).toBe(true)
    expect(invalidNameValidation('@jeff')).toBe(true)
    expect(invalidNameValidation('jeff .varela')).toBe(true)
    expect(invalidNameValidation('jeff @varela')).toBe(true)
    expect(invalidNameValidation('jeff_varela')).toBe(false)
})
test('If name contains any email urls, function should return true, invalid name', async () => {
    expect(invalidNameValidation('jeff.com')).toBe(true)
    expect(invalidNameValidation('jeff.co')).toBe(true)
    expect(invalidNameValidation('jeff.io')).toBe(true)
    expect(invalidNameValidation('jeff.net')).toBe(true)
    expect(invalidNameValidation('jeff.edu')).toBe(true)
    expect(invalidNameValidation('.edu')).toBe(true)
    expect(invalidNameValidation('.eduJeff')).toBe(true)
})
test('Inputs that contain only numbers should fail', async () => {
    expect(invalidNameValidation('1864')).toBe(true)
    expect(invalidNameValidation('zombie1864')).toBe(false)
})

test('invalidNumberValidation should receive two props number that satisfy boundry conditions, height >= 3.0 and weight >= 60', async () => {
    expect(invalidNumberValidation('3.0', '60')).toBe(false)
})
test('invalidNumberValidation should return true if either the height or weight does not meet boundry conditions', async () => {
    expect(invalidNumberValidation('2.0', '40')).toBe(true)
    expect(invalidNumberValidation('-2.0', '-40')).toBe(true)
    expect(invalidNumberValidation('-2.0', '140')).toBe(true)
})
test('invalidNumberValidation should return true if either height or weight exceeds upper limit of boundry condition', async () => {
    expect(invalidNumberValidation('9.0', '60')).toBe(true)
    expect(invalidNumberValidation('5.11', '6000')).toBe(true)
    expect(invalidNumberValidation('5.11', '-200')).toBe(true)
})