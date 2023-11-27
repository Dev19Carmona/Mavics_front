export const cutString = (string) => {
  let cut;
  if(string.length > 11){
    cut = string.substring(0, 11)
    return cut.concat('...')
  }else return string
}