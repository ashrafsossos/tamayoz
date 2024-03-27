import React from 'react'
import TimeAgo from 'react-timeago'

// const formatter = buildFormatter(frenchStrings)

export default function Timing({date}) {
  return (
    <div>
        <TimeAgo date={date} />
    </div>
  )
}
