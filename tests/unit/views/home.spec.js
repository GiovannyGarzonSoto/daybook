import Home from '@/views/Home'
import { shallowMount } from '@vue/test-utils'

describe('Home view tests', () => {
    it('should be render the component correctly', () => {
        const wrapper = shallowMount(Home)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('click in a button should be redirect to no-entry', () => {
        const mockRouter = {
            push: jest.fn()
        }
        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
    })
})