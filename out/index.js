"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var condition_json_1 = __importDefault(require("./condition.json"));
// Uncomment this line below if you want to test with my custom data with more nested array
// import conditionInput from './condition2.json';
// Enum for commonly used variables
var Operator;
(function (Operator) {
    Operator["OR"] = "OR";
    Operator["AND"] = "AND";
    Operator["EQ"] = "==";
    Operator["NOT_EQ"] = "!=";
    Operator["DOLLAR"] = "$";
})(Operator || (Operator = {}));
/**
 * Evaluate a condition against the context.
 * @param condition A domain-specific language (DSL) JSON object.
 * @param context An object of keys and values
 * @return boolean
 */
function evaluate(condition, context) {
    // If the condition input is not array then return false as the data is wrong
    if (!Array.isArray(condition))
        return false;
    // Root level comparision value
    var result = new Set();
    // Updates the result set with the conditions
    recEvaluate(result, condition, context, condition[0]);
    // Checks for the root level comparision and returns the value
    return binaryConditionCheck(condition[0], result);
}
/**
 * Updates the result boolean array with n level comparision data
 * Recursive Function
 *
 * @param {Set<boolean>} result
 * @param {*} condition
 * @param {({ [key: string]: string | undefined })} context
 * @param {*} globalOperator
 * @returns
 */
function recEvaluate(result, condition, context, globalOperator) {
    // Check if the first element of array has OR
    // If so then go one level inside to check
    if (condition[0] == Operator.OR) {
        // Set to store the index level comparision values
        var set = new Set();
        // Loop through the condition and check again
        for (var i = 1; i < condition.length; i += 1) {
            if (binaryConditionCheck(globalOperator, result)) {
                break;
            }
            set.add(recEvaluate(result, condition[i], context, globalOperator));
        }
        // After the evaluation of the index level, if there is true in the set return true
        // as (true || false) is true
        if (!set.has(undefined)) {
            if (set.has(true)) {
                result.add(true);
            }
            else {
                result.add(false);
            }
        }
        // Check if the first element of array has OR
        // If so then go one level inside to check
    }
    else if (condition[0] == Operator.AND) {
        // Set to store the index level comparision values
        var set = new Set();
        // Loop through the condition and check again
        for (var i = 1; i < condition.length; i += 1) {
            if (binaryConditionCheck(globalOperator, result)) {
                break;
            }
            set.add(recEvaluate(result, condition[i], context, globalOperator));
        }
        // After the evaluation of the index level, if there is true in the set return true
        // as (true || false) is true
        if (!set.has(undefined)) {
            if (set.has(false)) {
                result.add(false);
            }
            else {
                result.add(true);
            }
        }
        // If the condition is == then check whether the context values match with condition
    }
    else if (condition[0] == Operator.EQ) {
        if (context[filterSymbol(condition[1])] == condition[2]) {
            return true;
        }
        else {
            return false;
        }
        // If the condition is != then check whether the context values does not match with condition
    }
    else if (condition[0] == Operator.NOT_EQ) {
        if (context[filterSymbol(condition[1])] != condition[2]) {
            return true;
        }
        else {
            return false;
        }
    }
}
/**
 * Return the final result checking all the comparision from the boolean array
 *
 * @param {*} op
 * @param {boolean[]} result
 * @returns {boolean}
 */
function binaryConditionCheck(op, result) {
    // If the op is not either OR and AND, then the data is wrong.
    // By default return false
    if (typeof op !== 'string')
        return false;
    // If the global check is OR, then if array has true then return true
    if (op === Operator.OR) {
        return result.has(true);
    }
    else if (op === Operator.AND) {
        // If the global check is AND, then if array does not have false then return true
        return !result.has(false);
    }
    // By default return false
    return false;
}
/**
 * Remove dollar sign from the symbol
 *
 * @param {string} value
 * @returns {string}
 */
function filterSymbol(value) {
    return value.replace(Operator.DOLLAR, '');
}
/**
 * Click "run" to execute the test cases, which should pass after your implementation.
 */
(function () {
    var cases = [
        {
            context: {
                State: 'Alabama',
                Profession: 'Software development',
            },
            expected: true,
        },
        {
            context: {
                State: 'Texas',
            },
            expected: true,
        },
        {
            context: {
                State: 'Alabama',
                Profession: 'Gaming',
            },
            expected: false,
        },
        {
            context: {
                State: 'Utah',
            },
            expected: false,
        },
        {
            context: {
                Profession: 'Town crier',
            },
            expected: false,
        },
        {
            context: {
                Profession: 'Tradesperson',
            },
            expected: true,
        },
    ];
    for (var _i = 0, cases_1 = cases; _i < cases_1.length; _i++) {
        var c = cases_1[_i];
        console.time('Time');
        var actual = evaluate(condition_json_1.default, c.context);
        console.timeEnd('Time');
        console.log(actual === c.expected ? 'yay :-)' : 'nay :-(');
        console.log('\n\n');
    }
})();
//# sourceMappingURL=index.js.map