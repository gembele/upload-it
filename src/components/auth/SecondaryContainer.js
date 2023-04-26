import React from 'react'

export default function SecondaryContainer({children}) {
  return (
    <div
        className="w-100"
        style={{
          maxWidth: "700px",
          backgroundColor: "#1e1414",
          color: "white",
          boxShadow: "4px 4px black",
          borderRadius: "10px",
          alignSelf: "center",
          paddingInline: "150px",
          width: "100vh",
          border:'2px solid black',
          marginTop:'150px'
        }}
      >
        {children}
    </div>
  )
}
