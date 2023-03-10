export function stripMargin(
  template: TemplateStringsArray,
  ...expressions: any[]
) {
  let result = template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1] + part;
  });

  return result.replace(/\r?(\n)\s*\|/g, "$1");
}
