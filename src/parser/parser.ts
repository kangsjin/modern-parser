import type { Stmt } from "../ast/ast";
import { BlockStmt } from "../ast/statements";
import { TokenKind, type Token } from "../lexer/tokens";
import { parse_stmt } from "./stmt";

export interface Parser {
  tokens: Token[];
  pos: number;
}

function createParser(tokens: Token[]): Parser {
  return { tokens, pos: 0 };
}

export function parse(tokens: Token[]): BlockStmt {
  //   const body: Stmt[] = [];
  const body = Array<Stmt>();
  const parser = createParser(tokens);

  while (hasTokens(parser)) {
    body.push(parse_stmt(parser));
  }

  return new BlockStmt(body);
}

//HELPER METHODS

/**
 * Returns the current token in the parser's token stream.
 * @param p - The parser instance.
 * @returns The current token.
 */
function currentToken(p: Parser): Token {
  return p.tokens[p.pos];
}

/**
 * Returns the kind of the current token in the parser's token stream.
 * @param p - The parser instance.
 * @returns The kind of the current token.
 */
function currentTokenKind(p: Parser): TokenKind {
  return currentToken(p).kind;
}

/**
 * Advances the parser's position to the next token in the token stream.
 * @param p - The parser instance.
 * @returns The current token before advancing the position.
 */
function advance(p: Parser): Token {
  const tk = currentToken(p);
  p.pos++;
  return tk;
}

/**
 * Checks if the parser has more tokens to process.
 * @param p - The parser instance.
 * @returns `true` if the parser has more tokens, `false` otherwise.
 */
function hasTokens(p: Parser): boolean {
  return p.pos < p.tokens.length && currentTokenKind(p) != TokenKind.EOF;
}
