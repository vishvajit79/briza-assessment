// import conditionInput from './condition.json';

// /**
//  * Evaluate a condition against the context.
//  * @param condition A domain-specific language (DSL) JSON object.
//  * @param context An object of keys and values
//  * @return boolean
//  */
// function evaluate(
//   condition: typeof conditionInput,
//   context: { [key: string]: string | undefined }
// ): boolean {
//   // Your task is to implement this function such that it evaluates the
//   // imported condition.json against the context. Strings prefixed with '$'
//   // are variables and should have their values drawn from the context.
//   // Hint 1:  Do not hard-code references to context variables like 'Profession'
//   // Hint 2:  Conditions can be nested, n-levels deep

//   if (!Array.isArray(condition)) {
//     return false;
//   }

//   const flatCondition = condition.flat(Infinity);
//   const data = transpile(parse(flatCondition));
//   console.log(data);

//   return false;
// }

// function process(logic: string[]) {
//   const opReplacement = {
//     AND: '&&',
//     OR: '||',
//   };
//   var result, op, i, par, idx, token;
//   for (i = 0; i < logic.length; i++) {
//     token = logic[i];
//     if (token === 'AND' || token === 'OR') {
//       result += process(logic.slice(i));
//     } else {
//     }
//   }
// }

// const Op = Symbol('op');
// const Str = Symbol('str');

// const parse = (tokens: string[]) => {
//   let c = 0;

//   const peek = () => tokens[c];
//   const consume = () => tokens[c++];

//   const parseOp = () => {
//     const node = { val: consume(), type: Op, expr: [] };
//     while (peek()) node.expr.push(parseOp());
//     return node;
//   };

//   return parseOp();
// };

// const transpile = (ast) => {
//   const opMap = { AND: '&&', OR: '||' };
//   const transpileNode = (ast) =>
//     ast.type === Str ? transpileStr(ast) : transpileOp(ast);
//   const transpileStr = (ast) => ast.val;
//   const transpileOp = (ast) =>
//     `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
//   return transpileNode(ast);
// };

// /**
//  * Click "run" to execute the test cases, which should pass after your implementation.
//  */
// (function () {
//   const cases = [
//     {
//       context: {
//         State: 'Alabama',
//         Profession: 'Software development',
//       },
//       expected: true,
//     },
//     {
//       context: {
//         State: 'Texas',
//       },
//       expected: true,
//     },
//     {
//       context: {
//         State: 'Alabama',
//         Profession: 'Gaming',
//       },
//       expected: false,
//     },
//     {
//       context: {
//         State: 'Utah',
//       },
//       expected: false,
//     },
//     {
//       context: {
//         Profession: 'Town crier',
//       },
//       expected: false,
//     },
//     {
//       context: {
//         Profession: 'Tradesperson',
//       },
//       expected: true,
//     },
//   ];

//   for (const c of cases) {
//     const actual = evaluate(conditionInput, c.context);
//     console.log(actual === c.expected ? 'yay :-)' : 'nay :-(');
//   }
// })();
