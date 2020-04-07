import conditionInput from './condition.json';

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
  // Your task is to implement this function such that it evaluates the
  // imported condition.json against the context. Strings prefixed with '$'
  // are variables and should have their values drawn from the context.
  // Hint 1:  Do not hard-code references to context variables like 'Profession'
  // Hint 2:  Conditions can be nested, n-levels deep
  return false;
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
    const actual = evaluate(conditionInput, c.context);
    console.log(actual === c.expected ? 'yay :-)' : 'nay :-(');
  }
})();
