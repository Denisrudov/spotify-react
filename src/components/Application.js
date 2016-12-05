import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import { actions } from '../action/components/applicationActions'
import '../styles/components/application.scss'

import { Container, Row, Button, UL, LI, LINK, Clearfix, Jumbotron } from './Blocks'
import Results from './Result'

@connect(state => ({ store: state.application }))
class Application extends Component {

  static ALBUMS = 'albums'
  static ARTISTS = 'artists'

  constructor(props) {
    super(props)
    const { dispatch } = this.props
    this.actions = bindActionCreators(actions, dispatch)
    this.actions.started()
    this.state = {
      type: Application.ALBUMS,
    }
  }

  render() {

    const { type } = this.state
    const { store } = this.props
    const loading = store.get('loading')
    const failed = store.get('failed')
    return (
      <div className="application-component">
        <Container>
          <Row>
            <Jumbotron>
              <h1>Spotify search</h1>
            </Jumbotron>
            <UL>
              <LI
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({ type: Application.ALBUMS })
                }}
                className={classNames({ active: type === Application.ALBUMS })}
                >
                <LINK>Albums</LINK>
              </LI>
              <LI
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({ type: Application.ARTISTS })
                }}
                className={classNames({ active: type === Application.ARTISTS })}
              >
                <LINK>Artists</LINK>
              </LI>
            </UL>
          </Row>

          <Row>
            <div className="col-xs-12" style={{ padding: '10px 0' }}>
              <input
                value={this.searchValue()}
                onChange={(e) => {
                  const { target:{ value } } = e
                  const { actions:{ searchValue } } = this
                  const { type } = this.state
                  searchValue(value, type === Application.ALBUMS ? 'album' : 'artist')
                }}
                type="text" className="form-control"
                placeholder={'Search for an ' + (type === Application.ARTISTS ? 'Artist' : 'Album')}/>
            </div>
            <div className="col-xs-12" style={{ padding: '10px 0' }}>
              <Button
                className="btn btn-success"
                onClick={this.makeSearch}
              >
                <i className="glyphicon glyphicon-search"/> Search
              </Button>
              { this.displayLoading()}
              { failed ? <div style={{ display: 'inline', padding: '0 10px' }}>Error in Request</div> : null}
            </div>
          </Row>

          {this.showResults()}

        </Container>
      </div>
    )
  }

  showResults() {
    const { type } = this.state
    const { store } = this.props

    const result = store.get(type)
    if(!result) {
      return
    }
    let results
    if(result.items.length < 1) {
      results = 'No Results Found'
    } else {
      results = result.items.map((v, k) => {
        let el = [ <Results key={k} data={v}/> ]
        if((k + 1) % 4 === 0) {
          el.push(<Clearfix />)
        }
        return el
      })
    }
    let pagination
    const { next, previous } = result
    if(next || previous) {
      const p = previous ? <LI><LINK onClick={(e) => this.page(previous, e)} href="#">&laquo;</LINK></LI> : null
      const n = next ? <LI><LINK onClick={(e) => this.page(next, e)} href="#">&raquo;</LINK></LI> : null
      pagination = [
        <Clearfix key={0}/>,
        <UL key={1} className="pagination col-xs-12">
          {p}
          {n}
        </UL>]
    }
    return <Row>
      {results}
      {pagination}
    </Row>
  }

  searchValue() {
    const { type } = this.state
    const { store } = this.props
    return type === Application.ALBUMS ? store.get('album') : store.get('artist')
  }

  makeSearch = (e) => {
    e.preventDefault()
    const { type } = this.state
    const { actions: { search } } = this
    search(type)
  }

  page = (url, e) => {
    e.preventDefault()
    this.actions.pagination(url)
  }

  displayLoading() {
    const { store } = this.props
    const loading = store.get('loading')
    return loading ? <div style={{ display: 'inline', padding: '0 10px' }}>Loading...</div> : null
  }
}

export default Application
