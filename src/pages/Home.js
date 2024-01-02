import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../components/Card';
import { Box } from '@mui/material';



const Home = () => {
    const firebase = useFirebase();
    const [books,setBooks] = useState([]);
    
    useEffect(()=>{
        firebase.listAllBooks().then((data)=>setBooks(data.docs));
    },[]);

    console.log(books);
  return (
    <>
    <div>
        <h1>Books</h1>
        <Box sx={{display:'flex',gap:'6px'}}>
        {
            books?.map((data)=> <BookCard {...data.data()}/>)
        }
        </Box>
        </div>
    </>
  )
}

export default Home