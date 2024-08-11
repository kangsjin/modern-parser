export enum TokenKind {
  EOF = "EOF",
  NUMBER = "NUMBER",
  STRING = "STRING",
  IDENTIFIER = "IDENTIFIER",

  OPEN_BRACKET = "OPEN_BRACKET",
  CLOSE_BRACKET = "CLOSE_BRACKET",
  OPEN_CURLY = "OPEN_CURLY",
  CLOSE_CURLY = "CLOSE_CURLY",
  OPEN_PAREN = "OPEN_PAREN",
  CLOSE_PAREN = "CLOSE_PAREN",

  ASSIGNMENT = "ASSIGNMENT",
  EQUALS = "EQUALS",
  NOT = "NOT",
  NOT_EQUALS = "NOT_EQUALS",

  LESS = "LESS",
  LESS_EQUALS = "LESS_EQUALS",
  GREATER = "GREATER",
  GREATER_EQUALS = "GREATER_EQUALS",

  OR = "OR",
  AND = "AND",

  DOT = "DOT",
  DOT_DOT = "DOT_DOT",
  SEMI_COLON = "SEMI_COLON",
  COLON = "COLON",
  QUESTION = "QUESTION",
  COMMA = "COMMA",

  PLUS_PLUS = "PLUS_PLUS",
  MINUS_MINUS = "MINUS_MINUS",
  PLUS_EQUALS = "PLUS_EQUALS",
  MINUS_EQUALS = "MINUS_EQUALS",

  PLUS = "PLUS",
  DASH = "DASH",
  SLASH = "SLASH",
  STAR = "STAR",
  PERCENT = "PERCENT",

  //reserved keywords

  LET = "LET",
  CONST = "CONST",
  CLASS = "CLASS",
  NEW = "NEW",
  IMPORT = "IMPORT",
  FROM = "FROM",
  FN = "FN",
  IF = "IF",
  ELSE = "ELSE",
  FOREACH = "FOREACH",
  WHILE = "WHILE",
  FOR = "FOR",
  EXPORT = "EXPORT",
  TYPEOF = "TYPEOF",
  IN = "IN",
}

export const reserved_lu: Record<string, TokenKind> = {
  let: TokenKind.LET,
  const: TokenKind.CONST,
  class: TokenKind.CLASS,
  new: TokenKind.NEW,
  import: TokenKind.IMPORT,
  from: TokenKind.FROM,
  fn: TokenKind.FN,
  if: TokenKind.IF,
  else: TokenKind.ELSE,
  foreach: TokenKind.FOREACH,
  while: TokenKind.WHILE,
  for: TokenKind.FOR,
  export: TokenKind.EXPORT,
  typeof: TokenKind.TYPEOF,
  in: TokenKind.IN,
};

export interface Token {
  kind: TokenKind;
  value: string;
}

export function newToken(kind: TokenKind, value: string): Token {
  return {
    kind,
    value,
  };
}
