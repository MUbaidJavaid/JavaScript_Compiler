# JavaScript Syntax Validator Using Automata Theory

A JavaScript syntax validator built using concepts from the Theory of Automata (Finite State Machines and Pushdown Automata). This tool performs lexical analysis and syntax parsing to validate JavaScript code structure.

## Features

- **Lexical Analysis** using Finite State Machines and Regular Expressions
  - Tokenizes JavaScript code into keywords, identifiers, literals, etc.
  - Detects invalid tokens that don't match JavaScript lexical rules

- **Syntax Parsing** using Pushdown Automata concepts
  - Validates balanced brackets/parentheses using stack-based approach
  - Checks basic statement structures (e.g., if conditions must have parentheses)
  - Detects unclosed blocks and mismatched delimiters

- **User-Friendly Interface**
  - Code editor with line numbers
  - Syntax error highlighting
  - Detailed error messages with line/column numbers

## Theory Behind the Implementation

This validator implements two key automata theory concepts:

1. **Finite Automata** for lexical analysis:
   - Uses regular expressions to define token patterns
   - Processes input character by character in linear time
   - Maintains no memory beyond the current state

2. **Pushdown Automata** for syntax parsing:
   - Uses a stack to track nested structures
   - Validates context-free aspects of the syntax
   - Can handle balanced constructs like parentheses and braces

## Installation

No installation required! This is a pure client-side web application.

To run locally:
1. Clone this repository
2. Open `index.html` in a web browser

## Usage

1. Enter JavaScript code in the editor panel
2. Click "Validate Syntax" button
3. View results in the Validation Results panel:
   - Lexical errors (invalid tokens)
   - Syntax errors (structural issues)
4. Error lines are highlighted in the editor

## Error Interpretation

### Lexical Errors
- **Example**: `LexicalError: Invalid token '@' at Line 3:5`
- **Cause**: Character sequence doesn't match any valid JavaScript token pattern
- **Fix**: Remove or replace the invalid character

### Syntax Errors
- **Example**: `SyntaxError: Unclosed '{' at Line 1:10`
- **Cause**: Missing closing delimiter
- **Fix**: Add the missing closing brace

- **Example**: `SyntaxError: Expected '(' after 'if' at Line 2:5`
- **Cause**: Invalid statement structure
- **Fix**: Add parentheses around the if condition

## Implementation Details

### Lexer.js
- Tokenizes input using regular expressions
- Identifies tokens types: keywords, identifiers, literals, etc.
- Tracks line and column numbers for error reporting

### Parser.js
- Uses stack-based approach to validate syntax
- Checks for balanced delimiters
- Validates basic statement structures
- Maintains context for nested constructs

## Limitations

This is a simplified validator that demonstrates automata concepts. It does not implement:

- Full ECMAScript specification compliance
- Semantic analysis (type checking, etc.)
- Advanced syntax features (classes, modules, etc.)

## Future Enhancements

1. Support for more JavaScript syntax features
2. More detailed error messages with suggested fixes
3. Integration with build tools
4. Semantic analysis phase
5. Configurable validation rules

## Contributing

Contributions are welcome! Please open an issue or pull request for any:
- Bug fixes
- Additional syntax rules
- UI improvements
- Documentation enhancements

## License

MIT License