const joinURLString = (str: string) =>
  str.split(" ").join("-").toLowerCase().replace("?", "");
export default joinURLString;
