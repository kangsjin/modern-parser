import type { Token } from "../lexer/tokens";
import { Expr } from "./ast";

// --------------------------
// LITERAL EXPRESSIONS
// --------------------------
export class NumberExpr extends Expr {
  constructor(public value: number) {
    super();
  }
}

export class StringExpr extends Expr {
  constructor(public value: string) {
    super();
  }
}

export class SymbolExpr extends Expr {
  constructor(public value: string) {
    super();
  }
}

// --------------------------
// COMPLEX EXPRESSIONS
// --------------------------

export class BinaryExpr extends Expr {
  constructor(public left: Expr, public operator: Token, public right: Expr) {
    super();
  }
}
