import cloudinary from 'cloudinary'
import uploadImage from '@/modules/daybook/helpers/uploadImage'
import axios from 'axios'

cloudinary.config({
    cloud_name: 'dlejpqwlh',
    api_key: '584511922398951',
    api_secret: 'mFZpozrNXbtu0zMSpxeJH23UkDo'
})

describe('uploadImage tests', () => {
    test('shoulb be upload a file and return url', async(done) => {
        const { data } = await axios.get('https://res.cloudinary.com/dlejpqwlh/image/upload/v1641906848/yb7gqjw1gup7mxf45dtp.jpg', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.jpg')

        const url = await uploadImage(file)
        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    })
})