import React, { Component, PropTypes } from 'react'

export default class Result extends Component {

  static propTypes = {
    data: PropTypes.shape({
      images: PropTypes.array,
      name: PropTypes.string.isRequired
    })
  }

  render() {
    const { data: { images, name } } = this.props
    const src = images.length ? images[ 1 ].url : 'https://placehold.it/300x300'
    return (
      <div className="col-xs-12 col-md-3">
        <div className="thumbnail">
          <img src={src} alt=""/>
          <div className="caption">
            <h3>{name}</h3>
          </div>
        </div>
      </div>
    )
  }
}
