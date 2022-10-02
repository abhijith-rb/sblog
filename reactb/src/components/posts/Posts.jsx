import React from 'react'
import ReactDOM from 'react-dom'
import './posts.css'
import Post from '../post/Post'

export default function Posts({posts}) {
  return (
    <div className='posts'>
      {
        posts.map((p) => (
          <Post post={p} />
        ))
      }
     
    </div>
  )
}
