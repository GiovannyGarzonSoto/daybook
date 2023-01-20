import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = (initialState) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })

describe('vuex journal module tests', () => {
    it('should be have this initial state', () => {
        const store = createVuexStore(journalState)
        const { isLoading, entries} = store.state.journal
        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    it('mutation setEntries', () => {
        const store = createVuexStore({isLoading: true, entries: []})
        expect(store.state.journal.entries.length).toBe(0)
        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    it('mutation updateEntry', () => {
        const store = createVuexStore(journalState)
        const updateEntry = {
            id: '-Mt6wfxGy7cVRnuLUiRx',
            date : 1641884595126,
            picture : 'https://res.cloudinary.com/dlejpqwlh/image/upload/v1641907067/jxeuteti8w6mqw0ndfsk.jpg',
            text : 'hello tests'
        }
        store.commit('journal/updateEntry', updateEntry)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updateEntry.id)).toEqual(updateEntry)
    })

    test('mutation: addEntry deleteEntry', () => {
        const store = createVuexStore(journalState)
        const entry = {id: 'abcd1234', text: 'Hi tests'}
        store.commit('journal/addEntry', entry)
        expect(store.state.journal.entries.length).toBe(3)
        expect(store.state.journal.entries.find(e => e.id === entry.id)).toEqual(entry)
        
        store.commit('journal/deleteEntry', entry.id)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === entry.id)).toBeFalsy()
    })

    test('getters: getEntriesTerm getEntriesById', () => {
        const store = createVuexStore(journalState)
        const [ entry1, entry2 ] = journalState.entries
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('mundo').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('mundo')).toEqual([entry2])
        expect(store.getters['journal/getEntryById'](entry1.id)).toEqual(entry1)
    })

    test('actions: loadEntries', async() => {
        const store = createVuexStore({isLoading: true, entries: []})
        await store.dispatch('journal/loadEntries')
        expect(store.state.journal.entries.length).toBe(4)
    })

    test('actions:updateEntry', async() => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: '-Mt6wfxGy7cVRnuLUiRx',
            date : 1641884595126,
            picture : 'https://res.cloudinary.com/dlejpqwlh/image/upload/v1641907067/jxeuteti8w6mqw0ndfsk.jpg',
            text : 'test'
        }
        await store.dispatch('journal/updateEntry', updatedEntry)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    })

    test('actions: createEntry deleteEntry', async() => {
        const store = createVuexStore(journalState)
        const newEntry = {
            date: 129373563,
            text: 'nueva entrada tests'
        }
        const id = await store.dispatch('journal/createEntry', newEntry)
        expect(typeof id).toBe('string')
        expect(id).toBe(store.state.journal.entries.find(e => e.id === id).id)

        await store.dispatch('journal/deleteEntry', id)
        expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()

    })
})