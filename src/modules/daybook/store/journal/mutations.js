// export const myMutation = ( state ) => {

// }



export const setEntry = ( state, entries ) => {
  state.entryList = [...entries];
  state.isLoading = false;
}

export const updateEntry = ( state, entryUpdated ) => {
  const index = state.entryList.map( e => e.id).indexOf(entryUpdated.id)
  state.entryList[index] = entryUpdated
}
export const addEntry = (/* state */ ) => {

}

