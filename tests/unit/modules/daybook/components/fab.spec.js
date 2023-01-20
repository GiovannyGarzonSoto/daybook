import Fab from '@/modules/daybook/components/Fab'
import { shallowMount } from '@vue/test-utils'

describe('Fab components tests', () => {
    it('should be show the icon by default', () => {
        const wrapper = shallowMount(Fab)
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-plus')).toBeTruthy()
    })

    it('should be show the icon with argument: fa-circle', () => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')
        expect(iTag.classes('fa-circle')).toBeTruthy()
    })

    it('should be emit the event on:click when is clicked', () => {
        const wrapper = shallowMount(Fab)
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })
})