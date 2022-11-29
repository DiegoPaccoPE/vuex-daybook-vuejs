// export const myGetter = ( state ) => {

// }

export const getEntryByTerm = ( state ) => ( term = '' ) => {
  if(term === '') return state.entryList;
  return state.entryList.filter((entry) => entry.text.toLowerCase().includes(term.toLowerCase()))
}

export const getEntryById = ( state ) => ( id ) => {
  const entry = state.entryList.find((entry) => entry.id === id)

  if(!entry) return;

  return {...entry}
}