export const cutString = (string) => {
  let cut;
  if (string.length > 11) {
    cut = string.substring(0, 11);
    return cut.concat("...");
  } else return string;
};

export const getLazyQuery = async (get, type, set, variables = {}) => {
  let data = await get(variables);
  data = data.data[type];
  set((prevState) => {
    let prevCopy = [...prevState];
    prevCopy = [...data];
    //if (prevCopy.length === 0 && data.length > 0) prevCopy.push(...data);
    return prevCopy;
  });
};

export const addField = (set = () => {}, field = "", value = "") =>{
  set(prevState=>{
    const copy = [...prevState]
    copy.forEach((element) => {
      element[field] = value
    });
    return copy
   })
}
  
