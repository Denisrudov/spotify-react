import { expect } from 'chai'
import { fromJS } from 'immutable'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as a from '../../../src/action/components/applicationActions'
import { searchAlbum, searchArtist } from '../../../src/services/index'
import nock from 'nock'

const mockStore = configureMockStore([ thunk ])

describe('application Actions', () => {
  afterAll(() => {
    nock.cleanAll()
  })
  it('should start an application', () => {
    const expectedAction = {
      type: a.constants.APPLICATION_STARTED
    }
    expect(a.actions.started()).to.be.deep.equal(expectedAction)
  })

  it('should start load and load data and be able fail', () => {

    const started = {
      type: a.constants.LOADING
    }
    const loaded = {
      type: a.constants.LOADED
    }
    const failed = {
      type: a.constants.FAILED
    }

    expect(a.actions.loadingResults()).to.be.deep.equal(started)
    expect(a.actions.loadedResults()).to.be.deep.equal(loaded)
    expect(a.actions.failed()).to.be.deep.equal(failed)
  })

  it('should get artist', async() => {

    const state = {
      application: fromJS({ artist: 'madonna' })
    }
    const expectedArtActions = [
      { type: 'LOADING' },
      { type: 'LOADED' },
      { type: 'LOAD_RESULTS', data: { artists: true } }
    ]

    const store = mockStore(state)

    nock('https://api.spotify.com/v1/search')
      .get('?type=artist&q=madonna').reply(200, {
      artists: true
    })

    const artUrl = 'https://api.spotify.com/v1/search?type=artist&q=madonna'

    expect(searchArtist('madonna')).to.be.equal(artUrl)


    await store.dispatch(a.actions.search('artists'))
    expect(store.getActions()).to.be.deep.equal(expectedArtActions)

    //const artistData = await makeCall(artUrl)

    //console.log(artistData)

  })


  it('should get albums',async()=>{
    const state = {
      application: fromJS({ artist: '', album: 'monster' })
    }
    const expectedActions = [
      { type: 'LOADING' },
      { type: 'LOADED' },
      { type: 'LOAD_RESULTS', data: { albums: true } }
      ]


    const store = mockStore(state)

    nock('https://api.spotify.com/v1/search')
      .get('?type=album&q=monster').reply(200, {
      albums: true
    })

    const albumUrl = 'https://api.spotify.com/v1/search?type=album&q=madonna'

    expect(searchAlbum('madonna')).to.be.equal(albumUrl)

    await store.dispatch(a.actions.search('albums'))
    expect(store.getActions()).to.be.deep.equal(expectedActions)

  })

  it('should fail request', async()=>{
    const expectedActions = [ { type: 'LOADING' }, { type: 'FAILED' } ]
    const state = {
      application: fromJS({ artist: '', album: 'madonna' })
    }
    const store = mockStore(state)
    nock('https://api.spotify.com/v1/search')
      .get('?type=album&q=madonna').reply(500, false)

    await store.dispatch(a.actions.search('albums'))

    expect(store.getActions()).to.be.deep.equal(expectedActions)


  })

})