import { expect } from 'chai'
import { fromJS } from 'immutable'
import reducer from '../../src/reducers/components/application'
import * as a from '../../src/action/components/applicationActions'

const initialState = fromJS({
  artist: '',
  album: '',
})

describe('test application reducers', () => {

  it('should return initial state', () => {
    expect(initialState).to.be.deep.equal(reducer(initialState, { type: false }))
  })

  it('should update search queries', () => {

    const testValue = 'testValue'
    expect(initialState.set('artist', testValue))
      .to
      .be
      .deep
      .equal(reducer(initialState, a.actions.searchValue(testValue, 'artist')))

    expect(initialState.set('album', testValue))
      .to
      .be
      .deep
      .equal(reducer(initialState, a.actions.searchValue(testValue, 'album')))
  })

  it('should update data', () => {
    const expectedState = initialState.set('items', true)
    expect(expectedState).to.be.deep.equal(reducer(initialState, a.actions.updateResults({ items: true })))
  })

  it('should be failed', () => {
    const expectedState = initialState.set('loading', false).set('failed', true)
    expect(expectedState).to.be.deep.equal(reducer(initialState, a.actions.failed()))
  })

  it('should loading data', () => {
    const expectedState = initialState.set('loading', true).set('failed', false)
    expect(expectedState).to.be.deep.equal(reducer(initialState, a.actions.loadingResults()))
  })

  it('should update when data are loaded', () => {
    const expectedState = initialState.set('loading', false)
    expect(expectedState).to.be.deep.equal(reducer(initialState, a.actions.loadedResults()))
  })

})