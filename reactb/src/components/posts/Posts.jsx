import React from 'react'
import ReactDOM from 'react-dom'
import './posts.css'
import Post from '../post/Post'

export default function Posts({posts}) {
  const reversed = [...posts].reverse();
  console.log(posts)
  console.log(reversed)
  return (
    <div className='posts'>
      {
        reversed.map((p) => (
          <Post post={p} />
        ))
      }
     
    </div>
  )
}
