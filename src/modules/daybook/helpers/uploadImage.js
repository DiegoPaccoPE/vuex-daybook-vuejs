import axios from "axios"


const uploadImage = async ( file ) => {
  if(!file) return

  try {
    const formData = new FormData()
    formData.append('upload_preset', 'vue-daybook')
    formData.append('file', file)

    const url = 'https://api.cloudinary.com/v1_1/dlcnyilwn/image/upload'
    const { data } = await axios.post(url, formData)
    return data.secure_url
  } catch (error) {
    console.error('Hubo un error con el cargado de imagen')
    console.log(error)
    return null
  }
}

export default uploadImage