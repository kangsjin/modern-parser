import { TokenKind, newToken, reserved_lu, type Token } from "./tokens";

type RegexHandler = (lex: Lexer, regex: RegExp) => void;

interface RegexPattern {
  regex: RegExp;
  handler: RegexHandler;
}

export interface Lexer {
  patterns: RegexPattern[];
  tokens: Token[];
  source: string;
  pos: number;
}

/**
 * Tokenizes the provided source string and returns an array of tokens.
 * @param source - The input source string to be tokenized.
 * @returns An array of tokens representing the tokenized source.
 */
export function tokenize(source: string): Token[] {
  const lex = createLexer(source);

  //10 + 5
  //while we still have tokens
  while (!at_eof(lex)) {
    let matched = false;

    for (const pattern of lex.patterns) {
      const match = pattern.regex.exec(remainder(lex));
      if (match && match.index === 0) {
        pattern.handler(lex, pattern.regex);
        matched = true;
        break;
      }
    }
    if (!matched) {
      throw new Error(
        `lexer error: unrecognized token near '${remainder(lex)}'`
      );
    }
  }

  lex.tokens.push(newToken(TokenKind.EOF, "EOF"));

  return lex.tokens;
}

/**
 * Advances the lexer's position by the specified number of characters.
 * @param lex - The lexer instance.
 * @param n - The number of characters to advance.
 */
function advanceN(lex: Lexer, n: number) {
  lex.pos += n;
}

/**
 * Returns the character at the current position in the lexer's source string.
 * @param lex - The lexer instance.
 * @returns The character at the current position in the source string.
 */
function at(lex: Lexer): string {
  return lex.source[lex.pos];
}

/**
 * Returns the remaining portion of the lexer's source string starting from the current position.
 * @param lex - The lexer instance.
 * @returns The remaining portion of the source string.
 */
function remainder(lex: Lexer): string {
  return lex.source.slice(lex.pos);
}

/**
 * Checks if the lexer has reached the end of the source string.
 * @param lex - The lexer instance.
 * @returns `true` if the lexer has reached the end of the source string, `false` otherwise.
 */
function at_eof(lex: Lexer): boolean {
  return lex.pos >= lex.source.length;
}

/**
 * Creates a default regular expression handler function that advances the lexer's position
 * by the length of the matched value and pushes a new token with the specified kind and value.
 * @param kind - The token kind to use for the new token.
 * @param value - The value to use for the new token.
 * @returns A function that can be used as a regular expression handler in the lexer.
 */
function defaultHandler(kind: TokenKind, value: string): RegexHandler {
  return (lex: Lexer, regex: RegExp) => {
    advanceN(lex, value.length);
    lex.tokens.push(newToken(kind, value));
  };
}

/**
 * Creates a new lexer instance with the specified source string.
 * @param source - The source string to be lexed.
 * @returns A new lexer instance with the specified source string.
 */
function createLexer(source: string): Lexer {
  return {
    pos: 0,
    source: source,
    tokens: [],
    patterns: [
      { regex: /[0-9]+(.[0-9]+)?/, handler: numberHandler },
      { regex: /"[^"]*"/, handler: stringHandler },
      { regex: /\/\/.*/, handler: skipHandler },
      { regex: /\s+/, handler: skipHandler },
      { regex: /[a-zA-Z_][a-zA-Z0-9_]*/, handler: symbolHandler },
      {
        regex: /\[/,
        handler: defaultHandler(TokenKind.OPEN_BRACKET, "["),
      },
      {
        regex: /]/,
        handler: defaultHandler(TokenKind.CLOSE_BRACKET, "]"),
      },
      {
        regex: /{/,
        handler: defaultHandler(TokenKind.OPEN_CURLY, "{"),
      },
      {
        regex: /}/,
        handler: defaultHandler(TokenKind.CLOSE_CURLY, "}"),
      },
      {
        regex: /\(/,
        handler: defaultHandler(TokenKind.OPEN_PAREN, "("),
      },
      {
        regex: /\)/,
        handler: defaultHandler(TokenKind.CLOSE_PAREN, ")"),
      },
      { regex: /==/, handler: defaultHandler(TokenKind.EQUALS, "==") },
      {
        regex: /!=/,
        handler: defaultHandler(TokenKind.NOT_EQUALS, "!="),
      },
      {
        regex: /=/,
        handler: defaultHandler(TokenKind.ASSIGNMENT, "="),
      },
      { regex: /!/, handler: defaultHandler(TokenKind.NOT, "!") },
      {
        regex: /<=/,
        handler: defaultHandler(TokenKind.LESS_EQUALS, "<="),
      },
      { regex: /</, handler: defaultHandler(TokenKind.LESS, "<") },
      {
        regex: />=/,
        handler: defaultHandler(TokenKind.GREATER_EQUALS, ">="),
      },
      { regex: />/, handler: defaultHandler(TokenKind.GREATER, ">") },
      { regex: /\|\|/, handler: defaultHandler(TokenKind.OR, "||") },
      { regex: /&&/, handler: defaultHandler(TokenKind.AND, "&&") },
      {
        regex: /\.\./,
        handler: defaultHandler(TokenKind.DOT_DOT, ".."),
      },
      { regex: /\./, handler: defaultHandler(TokenKind.DOT, ".") },
      {
        regex: /\;/,
        handler: defaultHandler(TokenKind.SEMI_COLON, ";"),
      },
      { regex: /\:/, handler: defaultHandler(TokenKind.COLON, ":") },
      {
        regex: /\?/,
        handler: defaultHandler(TokenKind.QUESTION, "?"),
      },
      // { regex: RegExp("?"), handler: defaultHandler(TokenKind.QUESTION, "?") },
      { regex: /,/, handler: defaultHandler(TokenKind.COMMA, ",") },
      {
        regex: /\+\+/,
        handler: defaultHandler(TokenKind.PLUS_PLUS, "++"),
      },
      {
        regex: /--/,
        handler: defaultHandler(TokenKind.MINUS_MINUS, "--"),
      },
      {
        regex: /\+=/,
        handler: defaultHandler(TokenKind.PLUS_EQUALS, "+="),
      },
      {
        regex: /-=/,
        handler: defaultHandler(TokenKind.MINUS_EQUALS, "-="),
      },
      { regex: /\+/, handler: defaultHandler(TokenKind.PLUS, "+") },
      { regex: /\-/, handler: defaultHandler(TokenKind.DASH, "-") },
      { regex: /\//, handler: defaultHandler(TokenKind.SLASH, "/") },
      { regex: /\*/, handler: defaultHandler(TokenKind.STAR, "*") },
      { regex: /\%/, handler: defaultHandler(TokenKind.PERCENT, "%") },
    ],
  };
}

/**
 * Skips over the matched text in the lexer.
 *
 * @param lex - The lexer instance.
 * @param regex - The regular expression to match the text to skip.
 */
function skipHandler(lex: Lexer, regex: RegExp) {
  const spaces = regex.exec(remainder(lex))![0];
  advanceN(lex, spaces.length);
}

/**
 * Handles the parsing of numeric tokens in the lexer.
 *
 * @param lex - The lexer instance.
 * @param regex - The regular expression to match the numeric token.
 */
function numberHandler(lex: Lexer, regex: RegExp) {
  const digits = remainder(lex).match(regex)![0];
  lex.tokens.push(newToken(TokenKind.NUMBER, digits));
  advanceN(lex, digits.length);
}

/**
 * Handles the parsing of string literal tokens in the lexer.
 *
 * @param lex - The lexer instance.
 * @param regex - The regular expression to match the string literal.
 */
function stringHandler(lex: Lexer, regex: RegExp) {
  const stringLiteral = regex.exec(remainder(lex))![0];
  lex.tokens.push(newToken(TokenKind.STRING, stringLiteral.slice(1, -1)));
  advanceN(lex, stringLiteral.length);
}

/**
 * Handles the parsing of identifier and reserved keyword tokens in the lexer.
 *
 * @param lex - The lexer instance.
 * @param regex - The regular expression to match the identifier or reserved keyword.
 */
function symbolHandler(lex: Lexer, regex: RegExp) {
  const value = regex.exec(remainder(lex))![0];
  const kind = reserved_lu[value];
  if (kind) {
    lex.tokens.push(newToken(kind, value));
  } else {
    lex.tokens.push(newToken(TokenKind.IDENTIFIER, value));
  }

  advanceN(lex, value.length);
}
