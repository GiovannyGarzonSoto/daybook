import axios from 'axios'

const uploadImage = async (file) => {
    if(!file) return
    try{
        const formData = new FormData()
        formData.append('upload_preset', 'cursovue')
        formData.append('file', file)
        const url = 'https://api.cloudinary.com/v1_1/dlejpqwlh/image/upload'
        const {data} = await axios.post(url, formData)
        return data.secure_url
    }
    catch(err){
        console.log('error al cargar la imagen', err)
        return null
    }
}

export default uploadImage