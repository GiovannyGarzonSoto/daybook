import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Tests on Entry component', () => {
    test('should be match with snapshot', ( )=> {
        const wrapper = shallowMount(Entry, {
            props: {
                entry: journalState.entries[0]
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should be redirect when entry-container is clicked', ( )=> {
        const mockRouter = {
            push: jest.fn()
        }
        const wrapper = shallowMount(Entry, {
            props: {
                entry: journalState.entries[0]
            },
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
        wrapper.find('.entry-container').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: journalState.entries[0].id}})
    })

    test('computed properties', ( )=> {
        const wrapper = shallowMount(Entry, {
            props: {
                entry: journalState.entries[0]
            }
        })
        expect(wrapper.vm.day).toBe(11)
        expect(wrapper.vm.month).toBe('Enero')
        expect(wrapper.vm.yearDate).toBe('2022, Martes')
    })
})