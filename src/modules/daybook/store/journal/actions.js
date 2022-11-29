// export const myAction = async ({commit}) => {
  // return state;
// }

import journalApi from "@/api/journalApi"


export const loadEntries = async ( {commit}) => {
  const { data } = await journalApi.get('/entries.json')
  const entries = []
  for (const id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }
  commit('setEntry', entries)
}

export const updateEntry = async (/*{commit}*/) => {
  // return state;
}

export const createEntry = async (/*{commit}*/) => {
  // return state;
}