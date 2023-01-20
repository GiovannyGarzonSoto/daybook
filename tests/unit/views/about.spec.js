import About from '@/views/About'
import { shallowMount } from '@vue/test-utils'

describe('About view tests', () => {
    it('should be render the component correctly', () => {
        const wrapper = shallowMount(About)
        expect(wrapper.html()).toMatchSnapshot()
    })
})