import React from 'react';
import '../App.css';
import Article from '../articles'
import BlogGrid from './bloggrid'
import SearchDog from './dogsearch';
function Home() {
  return (
    <> 
    <h2 style={{ color: 'green' }}> Welcome to The Canine Shelter</h2>     
     <center><SearchDog /></center>
      <BlogGrid />
    </>
  )
}
export default Home;