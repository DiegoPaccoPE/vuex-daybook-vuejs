// export const myGetter = ( state ) => {

// }

export const getEntryByTerm = ( state ) => ( term = '' ) => {
  if(term === '') return state.entryList;
  return state.entryList.filter((entry) => entry.text.toLowerCase().includes(term.toLowerCase()))
}

export const getEntryById = ( /*state*/ ) => {

}