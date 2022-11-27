// export default () => ({

// })

export default () => ({
  isLoading: true,
  entryList: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, dolorem excepturi? Tempore, asperiores debitis cupiditate consequuntur eius deserunt, provident totam numquam nobis nesciunt necessitatibus. Totam porro veniam unde veritatis repellat?',
      picture: null
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, dolorem excepturi? Tempore, asperiores debitis cupiditate consequuntur eius deserunt, provident totam numquam nobis nesciunt necessitatibus. Totam porro veniam unde veritatis repellat?',
      picture: null
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, dolorem excepturi? Tempore, asperiores debitis cupiditate consequuntur eius deserunt, provident totam numquam nobis nesciunt necessitatibus. Totam porro veniam unde veritatis repellat?',
      picture: null
    },
    {
      id: new Date().getTime() + 3000,
      date: new Date().toDateString(),
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, dolorem excepturi? Tempore, asperiores debitis cupiditate consequuntur eius deserunt, provident totam numquam nobis nesciunt necessitatibus. Totam porro veniam unde veritatis repellat?',
      picture: null
    }
  ]
})