import React from 'react'
import { Container } from 'react-bootstrap'

export default function PrimaryContainer({children}) {
  return (
    <Container
      style={{
        backgroundColor: "#2f303a",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        maxWidth: "100%",
        flexDirection: 'column'
      }}
    >{children}</Container>
  )
}
