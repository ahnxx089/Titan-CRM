/////////////////////////////////////////////////
// Our own custom validation module.
// Based on "validator" package.
//
// @file:   validation.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var validator = require('validator');

var validation = function () {

    // SANITIZATION METHODS
    // ==========================================
    //
    var sanitizeInput = function (input) {
        if (input) {
            input += ''; // convert to string ("validator" works only with strings)
            input = validator.trim(input);
        } else {
            input = null; // get rid of empty string or "undefined"
        }
        return input;
    };

    var convertToInt = function (str) {
        return validator.toInt(str);
    };
    
    var convertToFloat = function (str) {
        return validator.toFloat(str);
    };


    // VALIDATION METHODS
    // ==========================================
    //
    var validateInt = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isInt(input)) {
                return label + ' must be an integer.';
            }
        }
        return '';
    };
    
    var validateFloat = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isFloat(input)) {
                return label + ' must be a floating point number.';
            }
        }
        return '';
    };

    var validateString = function (input, isRequired, maxLen, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isByteLength(input, {
                    min: 1,
                    max: maxLen
                })) {
                return label + ' must be less than ' + maxLen + ' characters.';
            }
        }
        return '';
    };
    
    var validateBoolean = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isInt(input) && !(input === '1' || input === '0')) {
                return label + ' must be an integer and either 1 or 0.';
            }
        }
        return '';
    };

    var validateDate = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isDate(input)) {
                return label + ' must be a valid date.';
            }
        }
        return '';
    };
    
    var validateEmail = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isEmail(input, { allow_display_name: true })) {
                return label + ' must be a valid email.';
            }
        }
        return '';
    };
    
    var validateUrl = function (input, isRequired, label) {
        if (isRequired && !input) {
            return label + ' is required.';
        }
        if (input) {
            if (!validator.isURL(input)) {
                return label + ' must be a valid URL.';
            }
        }
        return '';
    };


    return {
        sanitizeInput: sanitizeInput,
        convertToInt: convertToInt,
        convertToFloat: convertToFloat,
        validateInt: validateInt,
        validateFloat: validateFloat,
        validateString: validateString,
        validateBoolean: validateBoolean,
        validateDate: validateDate,
        validateEmail: validateEmail,
        validateUrl: validateUrl
    };

};

module.exports = validation;