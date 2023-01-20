import { createStore } from 'vuex'
import { journalState } from '../../../mock-data/test-journal-state'
import EntryList from '@/modules/daybook/components/EntryList'
import { shallowMount } from '@vue/test-utils'
import journal from '@/modules/daybook/store/journal'

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

describe('', () => {
    /*const journalMockModule = {
        namespaced: true,
        getters: {
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }
    const store = createStore({
        modules: {
            journal: {...journalMockModule}
        }
    })
    const wrapper = shallowMount(EntryList, {
        global: {
            mocks: {
                // $router: routerMock
            },
            plugins: [store]
        }
    })*/

    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }
    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()

        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('should be call getEntriesByTerm and show 2 entries', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.findAll('entry-stub').length).toBe(2)
    })

    test('should be call getEntriesByTerm & filter entries', async() => {
        const input = wrapper.find('input')
        await input.setValue('mundo')
        expect(wrapper.findAll('entry-stub').length).toBe(1)
    })

    test('new button should be redirect to new', () => {
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}})
    })
})