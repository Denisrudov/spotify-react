import React from 'react'

export function Container(props) {
  return <div className="container">{props.children}</div>
}

export function Row(props) {
  return <div className="row">{props.children}</div>
}

export function Button(props) {
  const { children, ...p } = props
  return <button {...p}>{children}</button>
}

export function UL(props) {
  const { children, ...p} = props
  return <ul className="nav nav-tabs" {...p}>{children}</ul>
}

export function LI(props) {
  const { children, ...p} = props
  return <li {...p}>{children}</li>
}

export function LINK(props) {
  const { children, ...p} = props
  return <a href="#" {...p}>{children}</a>
}

export function Clearfix(props) {
  const { children, ...p} = props
  return <div className="clearfix" {...p}>{children}</div>
}

export function Jumbotron(props) {
  return <div className="jumbotron">{props.children}</div>
}