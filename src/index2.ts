import conditionInput from './condition.json';

// Uncomment this line below if you want to test with my custom data with more nested array
// import conditionInput from './condition2.json';

// Enum for commonly used variables
enum Operator {
  OR = 'OR',
  AND = 'AND',
  EQ = '==',
  NOT_EQ = '!=',
  DOLLAR = '$',
}

/**
 * Evaluate a condition against the context.
 * @param condition A domain-specific language (DSL) JSON object.
 * @param context An object of keys and values
 * @return boolean
 */
function evaluate(
  condition: typeof conditionInput,
  context: { [key: string]: string | undefined }
): boolean {
  // If the condition input is not array then return false as the data is wrong
  if (!Array.isArray(condition)) return false;

  // Root level comparision value
  const result: boolean[] = [];

  // Updates the result array with the conditions
  recEvaluate(result, condition, context);

  // Checks for the root level comparision and returns the value
  return checkResult(condition[0], result);
}

/**
 * Updates the result boolean array with n level comparision data
 * Recursive Function
 *
 * @param {boolean[]} result
 * @param {*} condition
 * @param {({ [key: string]: string | undefined })} context
 * @returns
 */
function recEvaluate(
  result: boolean[],
  condition: any,
  context: { [key: string]: string | undefined }
) {
  // Check if the first element of array has OR
  // If so then go one level inside to check
  if (condition[0] == Operator.OR) {
    // Set to store the index level comparision values
    const set = new Set();

    // Loop through the condition and check again
    for (let i = 1; i < condition.length; i += 1) {
      set.add(recEvaluate(result, condition[i], context));
    }

    // After the evaluation of the index level, if there is true in the set return true
    // as (true || false) is true
    if (!set.has(undefined)) {
      if (set.has(true)) {
        result.push(true);
      } else {
        result.push(false);
      }
    }

    // Check if the first element of array has OR
    // If so then go one level inside to check
  } else if (condition[0] == Operator.AND) {
    // Set to store the index level comparision values
    const set = new Set();

    // Loop through the condition and check again
    for (let i = 1; i < condition.length; i += 1) {
      set.add(recEvaluate(result, condition[i], context));
    }

    // After the evaluation of the index level, if there is true in the set return true
    // as (true || false) is true
    if (!set.has(undefined)) {
      if (set.has(false)) {
        result.push(false);
      } else {
        result.push(true);
      }
    }

    // If the condition is == then check whether the context values match with condition
  } else if (condition[0] == Operator.EQ) {
    if (context[filterSymbol(condition[1])] == condition[2]) {
      return true;
    } else {
      return false;
    }

    // If the condition is != then check whether the context values does not match with condition
  } else if (condition[0] == Operator.NOT_EQ) {
    if (context[filterSymbol(condition[1])] != condition[2]) {
      return true;
    } else {
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
function checkResult(op: any, result: boolean[]): boolean {
  // If the op is not either OR and AND, then the data is wrong.
  // By default return false

  if (typeof op !== 'string') return false;

  // If the global check is OR, then if array has true then return true
  if (op === 'OR') {
    return result.includes(true);
  } else if (op === 'AND') {
    // If the global check is AND, then if array does not have false then return true
    return !result.includes(false);
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
function filterSymbol(value: string): string {
  return value.replace(Operator.DOLLAR, '');
}

/**
 * Click "run" to execute the test cases, which should pass after your implementation.
 */
(function () {
  const cases = [
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

  for (const c of cases) {
    console.time('Time');
    const actual = evaluate(conditionInput, c.context);
    console.timeEnd('Time');
    console.log(actual === c.expected ? 'yay :-)' : 'nay :-(');
    console.log('\n\n');
  }
})();
