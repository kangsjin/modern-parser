import { tokenize } from "./lexer/lexer";

async function main() {
  const path = "./examples/02.lang";
  const file = Bun.file(path);

  const source = await file.text();
  console.log(source);

  const tokens = tokenize(source);
  console.log(tokens);
}

main().catch(console.error);
