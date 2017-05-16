import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../Home'

describe('<Home />', () => {
  it('should render correctly', () => {
    const r = renderer.create(
      <Home />
    )
    expect(r.toJSON()).toMatchSnapshot()
  })
})
