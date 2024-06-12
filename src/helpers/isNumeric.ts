function isNumeric(userName?: string | number) {
  if (typeof userName === "number") return !isNaN(userName!);
  else
    userName!
      .replaceAll(" ", "")
      .split("")
      .some(function (c) {
        return !isNaN(c as unknown as number);
      });
}

export default isNumeric;
