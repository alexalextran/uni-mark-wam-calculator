import React from 'react'

export default function SubjectCard({Name, credits}) {
  return (
    <div>
    <h3>{Name}</h3>
    <p>Credits {credits}</p>
    </div>
  )
}
