const chai   = require('chai');
const expect = require('chai').expect;
const utils  = require('../core/utils');

describe('utils.js', () => {

    describe('findPatternInString()', () => {

        it('should return an error if \'regex_pattern\' and \'string\' are not provided', () => {
            expect(utils.findPatternInString()).to.be.instanceOf(Error).with.property('message', 'regex_pattern and string are required')
        })
    
        it('should return an error if \'regex_pattern\' is invalid', () => {
            expect(utils.findPatternInString('INVALID_REGEX_PATTERN')).to.be.instanceOf(Error)
        })

        it('should return an error if a matching string is not found', () => {
            const patterns = require('../modules/nodesdr-shipping-movements/config/patterns').portOfTyne()
    
            expect(utils.findPatternInString(patterns.tr, 'INVALID_STRING_VALUE')).to.be.instanceOf(Error).with.property('message', 'No matches found')
        })
    })
 
    describe('convertArrayToJSON()', () => {

        it('should return an Error if \'keys\'\ and \'array\' are not provided', () => {
            expect(utils.convertArrayToJSON()).to.be.instanceOf(Error).with.property('message', 'Keys and Array are required')
        })

        it('should return an Error if invalid keys and array data is provided', () => {
            const array = []
            expect(utils.convertArrayToJSON('INVALID_KEY', array)).to.be.instanceOf(Error).with.property('message', 'Unabled to loop through an empty Array')
        })
        
        it('should return an Object with the expected key, value pairs when all expected values are provided and are valid', () => {
            const keys = ['test_value_1', 'test_value_2', 'test_value_3', 'test_value_4', 'test_value_5']
            const array = [['value_1', 'value_2', 'value_3', 'value_4', 'value_5'], ['value_1', 'value_2', 'value_3', 'value_4', 'value_5']]
      
            expect(utils.convertArrayToJSON(keys, array)).to.be.instanceOf(Object).and.to.have.deep.property("0", {"test_value_1": "value_1", "test_value_2": "value_2", "test_value_3": "value_3", "test_value_4": "value_4", "test_value_5": "value_5"})
        })
    })

    describe('nullOrUndefined()', () => {

        it('should return undefined when a value of undefined is provided', () => {
            expect(utils.nullOrUndefined(undefined)).to.be.undefined
        })

        it('should return null when a value of null is provided', () => {
            expect(utils.nullOrUndefined(null)).to.be.null
        })

        it('should return false when a value that is not null or undefined is provided', () => {
            expect(utils.nullOrUndefined('VALUE')).to.equal(false)
        })
    })
    
    describe('convertToString()', () => {

        it('should return a String when a value is provided', () => {
            expect(utils.convertToString(12345)).to.be.a('string')
        })

        it('should return undefined when a value of undefined is provided', () => {
            expect(utils.convertToString(undefined)).to.be.undefined
        })

        it('should return null when a value of null is provided', () => {
            expect(utils.convertToString(null)).to.be.null
        })
    })

    describe('convertStringToLowercase()', () => {

        it('should return a lowercase string when an uppercase value is provided', () => {
            expect(utils.convertStringToLowercase('UPPERCASE_LOWERCASE')).to.equal('uppercase_lowercase')
        })

        it('should return a string when a number value is provided', () => {
            expect(utils.convertStringToLowercase(12345)).to.equal('12345')
        })

        it('should return undefined when a value of undefined is provided', () => {
            expect(utils.convertStringToLowercase(undefined)).to.be.undefined
        })

        it('should return null when a value of null is provided', () => {
            expect(utils.convertStringToLowercase(null)).to.be.null
        })
    })

    describe('convertStringToUppercase()', () => {

        it('should return an uppercase string when an lowercase value is provided', () => {
            expect(utils.convertStringToUppercase('lowercase_uppercase')).to.equal('LOWERCASE_UPPERCASE')
        })

        it('should return a string when a number value is provided', () => {
            expect(utils.convertStringToUppercase(12345)).to.equal('12345')
        })

        it('should return undefined when a value of undefined is provided', () => {
            expect(utils.convertStringToUppercase(undefined)).to.be.undefined
        })

        it('should return null when a value of null is provided', () => {
            expect(utils.convertStringToUppercase(null)).to.be.null
        })
    })

    describe('convertMillisecondsToHours()', () => {
        
        it('should return the number of hours from the number of milliseconds provided', () => {
            expect(utils.convertMillisecondsToHours(3600000)).to.equal(1)
        })

        it('should return an Error if a milliseconds value is not provided', () => {
            expect(utils.convertMillisecondsToHours()).to.be.instanceOf(Error).with.property('message', 'milliseconds must be a number')
        })

        it('should return an Error if a string value is provided', () => {
            expect(utils.convertMillisecondsToHours('NaN')).to.be.instanceOf(Error).with.property('message', 'milliseconds must be a number')
        })

        it('should return an Error if the provided milliseconds value is undefined', () => {
            expect(utils.convertMillisecondsToHours(undefined)).to.be.instanceOf(Error).with.property('message', 'milliseconds must be a number')
        })

        it('should return an Error if the provided milliseconds value is null', () => {
            expect(utils.convertMillisecondsToHours(null)).to.be.instanceOf(Error).with.property('message', 'milliseconds must be a number')
        })
    })

    describe('replaceCharacterOrSpaceWithUnderscore()', () => {
        
        it('should replace spaces in the string with underscores', () => {
            expect(utils.replaceCharacterOrSpaceWithUnderscore('A VALUE')).to.equal('A_VALUE')
        })

        it('should replace special charactors in the string with underscores', () => {
            expect(utils.replaceCharacterOrSpaceWithUnderscore('A V@A!L%U£E')).to.equal('A_V_A_L_U_E')
        })

        it('should return undefined when a value of undefined is provided', () => {
            expect(utils.convertStringToLowercase(undefined)).to.be.undefined
        })

        it('should return null when a value of null is provided', () => {
            expect(utils.convertStringToLowercase(null)).to.be.null
        })
    })

    describe('formatKeys()', () => {
       
        it('should replace spaces in the string with underscores', () => {
            const keys = ['Te$T', 'Te$T!Ng']
            expect(utils.formatKeys(keys)).to.be.instanceOf(Array) // [ 'te_t', 'te_t_ng' ]
        })
    })

    describe('sanitizeJSONObject()', () => {
        
        it('should remove all special charactors and return an object', () => {
            expect(utils.sanitizeJSONObject({ port: '|@$!+\'/?', status: '<*^%#' })).to.deep.equal({ port: '', status: '' })
        })

        it('should convert all non string values to Strings and return an object', () => {
            expect(utils.sanitizeJSONObject({ port: 12345, status: 67890 })).to.deep.equal({ port: '12345', status: '67890' })
        })
    })

    describe('sanitizeString()', () => {

        it('should return the String provided', () => {
            expect(utils.sanitizeString('A TEST VALUE')).to.equal('A TEST VALUE')
        })
        
        it('should remove all special charactors from the value provided and return an empty string', () => {
            expect(utils.sanitizeString('|@$!+\'/?<*^%#')).to.equal('')
        })

        it('should return undefined when a value of undefined is provided', () => {
            expect(utils.sanitizeString(undefined)).to.be.undefined
        })

        it('should return null when a value of null is provided', () => {
            expect(utils.sanitizeString(null)).to.be.null
        })
    })

    describe('convertHexToBinary()', () => {

        it('0 should return 0000', () => {
            expect(utils.convertHexToBinary('0')).to.equal('0000')
        })

        it('1 should return 0001', () => {
            expect(utils.convertHexToBinary('1')).to.equal('0001')
        })

        it('2 should return 0010', () => {
            expect(utils.convertHexToBinary('2')).to.equal('0010')
        })

        it('3 should return 0011', () => {
            expect(utils.convertHexToBinary('3')).to.equal('0011')
        })

        it('4 should return 0100', () => {
            expect(utils.convertHexToBinary('4')).to.equal('0100')
        })

        it('5 should return 0101', () => {
            expect(utils.convertHexToBinary('5')).to.equal('0101')
        })

        it('6 should return 0110', () => {
            expect(utils.convertHexToBinary('6')).to.equal('0110')
        })

        it('7 should return 0111', () => {
            expect(utils.convertHexToBinary('7')).to.equal('0111')
        })

        it('8 should return 1000', () => {
            expect(utils.convertHexToBinary('8')).to.equal('1000')
        })

        it('9 should return 1001', () => {
            expect(utils.convertHexToBinary('9')).to.equal('1001')
        })

        it('\'a\' should return 1010', () => {
            expect(utils.convertHexToBinary('a')).to.equal('1010')
        })

        it('\'b\' should return 1011', () => {
            expect(utils.convertHexToBinary('b')).to.equal('1011')
        })

        it('\'c\' should return 1100', () => {
            expect(utils.convertHexToBinary('c')).to.equal('1100')
        })

        it('\'d\' should return 1101', () => {
            expect(utils.convertHexToBinary('d')).to.equal('1101')
        })

        it('\'e\' should return 1110', () => {
            expect(utils.convertHexToBinary('e')).to.equal('1110')
        })

        it('\'f\' should return 1111', () => {
            expect(utils.convertHexToBinary('f')).to.equal('1111')
        })

        it('10 should return 10000', () => {
            expect(utils.convertHexToBinary('10')).to.equal('10000')
        })

        it('20 should return 100000', () => {
            expect(utils.convertHexToBinary('20')).to.equal('100000')
        })

        it('40 should return 1000000', () => {
            expect(utils.convertHexToBinary('40')).to.equal('1000000')
        })

        it('80 should return 10000000', () => {
            expect(utils.convertHexToBinary('80')).to.equal('10000000')
        })

        it('10 should return 100000000', () => {
            expect(utils.convertHexToBinary('100')).to.equal('100000000')
        })

        it('should return null when no value is provided', () => {
            expect(utils.convertHexToBinary()).to.be.null
        })

        it('should return null when an invalid value is provided', () => {
            expect(utils.convertHexToBinary('INVALID VALUE')).to.be.null
        })
    })

    describe('convertBinaryToDecimal()', () => {

        it('should return 0 when binary value \'0000\' is provided', () => {
            expect(utils.convertBinaryToDecimal('0000')).to.equal(0)
        })

        it('should return 1 when binary value \'0001\' is provided', () => {
            expect(utils.convertBinaryToDecimal('0001')).to.equal(1)
        })

        it('should return 2 when binary value \'0010\' is provided', () => {
            expect(utils.convertBinaryToDecimal('0010')).to.equal(2)
        })

        it('should return 4 when binary value \'0100\' is provided', () => {
            expect(utils.convertBinaryToDecimal('0100')).to.equal(4)
        })

        it('should return 5 when binary value \'0101\' is provided', () => {
            expect(utils.convertBinaryToDecimal('0101')).to.equal(5)
        })

        it('should return 8 when binary value \'1000\' is provided', () => {
            expect(utils.convertBinaryToDecimal('1000')).to.equal(8)
        })

        it('should return 16 when binary value \'10000\' is provided', () => {
            expect(utils.convertBinaryToDecimal('10000')).to.equal(16)
        })

        it('should return 32 when binary value \'100000\' is provided', () => {
            expect(utils.convertBinaryToDecimal('100000')).to.equal(32)
        })

        it('should return 64 when binary value \'1000000\' is provided', () => {
            expect(utils.convertBinaryToDecimal('1000000')).to.equal(64)
        })

        it('should return 128 when binary value \'10000000\' is provided', () => {
            expect(utils.convertBinaryToDecimal('10000000')).to.equal(128)
        })

        it('should return NaN when a non binary value is provided', () => {
            expect(utils.convertBinaryToDecimal('INVALID VALUE')).to.be.NaN
        })

        it('should return NaN when a value is not provided', () => {
            expect(utils.convertBinaryToDecimal()).to.be.NaN
        })
    })
})