import { Expr, Stmt } from "./ast";

export class BlockStmt extends Stmt {
  constructor(public body: Stmt[]) {
    super();
  }
}

export class ExpressionStmt extends Stmt {
  constructor(public expression: Expr) {
    super();
  }
}
