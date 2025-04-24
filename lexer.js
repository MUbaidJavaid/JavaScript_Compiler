/**
 * Lexical Analyzer using Finite State Machine concepts
 * Tokenizes JavaScript code and validates against lexical rules
 */
class Lexer {
  // Token types with regex patterns
  static TOKEN_TYPES = [
    { type: 'KEYWORD', pattern: /\b(if|else|for|while|function|return|let|const|var)\b/ },
    { type: 'IDENTIFIER', pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/ },
    { type: 'NUMBER', pattern: /\b\d+(\.\d+)?\b/ },
    { type: 'STRING', pattern: /(["'])(?:(?=(\\?))\2.)*?\1/ },
    { type: 'OPERATOR', pattern: /[+\-*/%=<>!&|^~?:]/ },
    { type: 'PUNCTUATION', pattern: /[{}()[\].,;]/ },
    { type: 'WHITESPACE', pattern: /\s+/ },
    { type: 'INVALID', pattern: /[^\s]/ } // Catch-all for invalid tokens
  ];

  /**
   * Tokenize input code and validate tokens
   * @param {string} code - JavaScript code to analyze
   * @returns {Array} Array of tokens with validation info
   */
  tokenize(code) {
    let tokens = [];
    let position = 0;
    let line = 1;
    let column = 1;

    while (position < code.length) {
      let match = null;
      let tokenType = null;

      // Try to match each token pattern
      for (const { type, pattern } of Lexer.TOKEN_TYPES) {
        pattern.lastIndex = 0; // Reset regex state
        const regex = new RegExp(`^${pattern.source}`);
        match = regex.exec(code.slice(position));
        
        if (match) {
          tokenType = type;
          break;
        }
      }

      if (!match) {
        // No patterns matched - invalid token
        const invalidChar = code[position];
        tokens.push({
          type: 'INVALID',
          value: invalidChar,
          valid: false,
          line,
          column,
          error: `Invalid token '${invalidChar}'`
        });
        position++;
        column++;
        continue;
      }

      const [value] = match;
      const valid = tokenType !== 'INVALID';
      
      tokens.push({
        type: tokenType,
        value,
        valid,
        line,
        column
      });

      // Update position and line/column counters
      position += value.length;
      const lines = value.split('\n');
      if (lines.length > 1) {
        line += lines.length - 1;
        column = lines[lines.length - 1].length + 1;
      } else {
        column += value.length;
      }
    }

    return tokens;
  }
}