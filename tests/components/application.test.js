import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import { UL, LI, Container, Row, Clearfix, LINK, Jumbotron } from '../../src/components/Blocks'
import Result from '../../src/components/Result'

describe('test application components', () => {

  it('should render elements', () => {
    const renderer = createRenderer()
    const elements = [
      [ <UL/>, 'ul' ],
      [ <LI/>, 'li' ],
      [ <Container/>, 'div' ],
      [ <Row/>, 'div' ],
      [ <Clearfix/>, 'div' ],
      [ <LINK/>, 'a' ],
      [ <Jumbotron/>, 'div' ]
    ]

    elements.forEach(el => {
      const rendered = renderer.render(el[ 0 ])
      expect(rendered.type).toBe(el[ 1 ])
    })

  })

  it('should render result', () => {

    const TestName = 'Test Name'
    const data = {
      images: [ '', { url: 'https://placehold.it/300x300' } ],
      name: TestName
    }

    const rendered = createRenderer().render(<Result data={data}/>)

    expect(rendered.props.children).toEqual(
      <div className="thumbnail">
        <img src={data.images[ 1 ].url} alt=""/>
        <div className="caption">
          <h3>{TestName}</h3>
        </div>
      </div>
    )
  })

})