/**
 * Syntax Parser using Pushdown Automata concepts
 * Validates token stream against JavaScript syntax rules
 */
class Parser {
  constructor() {
    this.stack = [];
    this.errors = [];
  }

  /**
   * Parse token stream and validate syntax
   * @param {Array} tokens - Token array from lexer
   * @returns {Array} Array of syntax errors
   */
  parse(tokens) {
    this.stack = [];
    this.errors = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      // Skip whitespace and invalid tokens (already reported by lexer)
      if (token.type === 'WHITESPACE' || !token.valid) continue;

      // Check for balanced braces/parens/brackets
      if (this.isOpening(token.value)) {
        this.stack.push({
          type: token.value,
          line: token.line,
          column: token.column
        });
      } else if (this.isClosing(token.value)) {
        if (this.stack.length === 0) {
          this.errors.push({
            type: 'SyntaxError',
            message: `Unexpected closing '${token.value}'`,
            line: token.line,
            column: token.column
          });
        } else {
          const last = this.stack.pop();
          if (!this.matches(last.type, token.value)) {
            this.errors.push({
              type: 'SyntaxError',
              message: `Mismatched '${last.type}' and '${token.value}'`,
              line: token.line,
              column: token.column
            });
          }
        }
      }

      // Additional syntax rules can be added here
      // For example: if statements must have parens
      if (token.type === 'KEYWORD' && token.value === 'if') {
        this.validateIfStatement(tokens, i);
      }
    }

    // Check for unclosed elements
    this.stack.forEach(unclosed => {
      this.errors.push({
        type: 'SyntaxError',
        message: `Unclosed '${unclosed.type}'`,
        line: unclosed.line,
        column: unclosed.column
      });
    });

    return this.errors;
  }

  isOpening(char) {
    return ['(', '{', '['].includes(char);
  }

  isClosing(char) {
    return [')', '}', ']'].includes(char);
  }

  matches(open, close) {
    const pairs = { '(': ')', '{': '}', '[': ']' };
    return pairs[open] === close;
  }

  validateIfStatement(tokens, index) {
    // Simplified if statement validation
    let parenOpen = false;
    let parenClose = false;
    
    for (let i = index + 1; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.type === 'WHITESPACE') continue;
      
      if (token.value === '(') {
        parenOpen = true;
        break;
      } else {
        this.errors.push({
          type: 'SyntaxError',
          message: `Expected '(' after 'if'`,
          line: token.line,
          column: token.column
        });
        break;
      }
    }
    
    // Additional validation for if statement structure can be added here
  }
}