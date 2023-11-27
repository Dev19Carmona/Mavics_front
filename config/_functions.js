export const cutString = (string) => {
  let cut;
  if(string.length > 11){
    cut = string.substring(0, 11)
    return cut.concat('...')
  }else return string
}

export const getLazyQuery = async (get, type, set) => {
  let data = await get();
  data = data.data[type];
  set((prevState) => {
    const prevCopy = [...prevState];
    if (prevCopy.length === 0 && data.length > 0) prevCopy.push(...data);
    return prevCopy;
  });
};