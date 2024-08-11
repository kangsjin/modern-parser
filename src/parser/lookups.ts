/**
 * Enum representing the binding power of different types of expressions in a programming language.
 * The binding power determines the order of operations when parsing expressions.
 * Higher binding power means the expression will be evaluated first.
 */
export enum BindingPower {
  default,
  comma,
  assignment,
  logical,
  relational,
  additive,
  multiplicative,
  unary,
  call,
  member,
  primary,
}
