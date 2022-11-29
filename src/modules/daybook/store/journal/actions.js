// export const myAction = async ({commit}) => {
  // return state;
// }

import journalApi from "@/api/journalApi"


export const loadEntries = async ( {commit}) => {
  const { data } = await journalApi.get('/entries.json')

  if(!data){
    return commit('setEntry', [])
  }

  const entries = []
  for (const id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }
  commit('setEntry', entries)
}

export const updateEntry = async ({commit}, entry) => {
  const { id, date, text, picture } = entry
  const dataToSave = {
    date,
    text,
    picture
  }
  const res = await journalApi.put(`/entries/${id}.json`, dataToSave)
  console.log(res)
  commit('updateEntry', {...entry})
}

export const createEntry = async ({commit}, newEntry) => {
  const {date, text, picture} = newEntry
  const dataToSave = {
    date,
    text,
    picture
  }
  const { data } = await journalApi.post('/entries.json', dataToSave)
  commit('addEntry', {id: data.name, ...dataToSave})
  return data.name
}

export const deleteEntry = async ({commit}, id) => {
  await journalApi.delete(`/entries/${id}.json`)
  commit('deleteEntry', id)
}