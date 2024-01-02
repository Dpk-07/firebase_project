import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import { useFirebase } from '../context/Firebase';
import Navbar from '../components/Navbar';

export default function List() {
    const firebase = useFirebase();

    const [listData ,setListData] = React.useState({
        bookname:'',
        price:'',
        isbn:'',
    }) ;
    const [coverFile,setCoverFile] = React.useState('');

    const handleListData = (e)=>{
        const {name,value} = e.target;
        setListData(prev=>({...prev,[name]:value}));
    }

    const hanldeSubmit = (e)=>{
        e.preventDefault();
        firebase.handleCreateNewList(listData.bookname ,listData.isbn,listData.price,coverFile);
        console.log(listData,coverFile);
        setListData(
            {bookname:'',
            price:'',
            isbn:'',
        });
        setCoverFile('');
    }

  return (
    <React.Fragment>
        <Navbar/>
        <Box>
      <Typography  textAlign={'center'} variant="h6" gutterBottom>
        Book Listing
      </Typography>
      </Box>
      <Box padding={14}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="bookname"
            name="bookname"
            label="Book Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleListData}
            value={listData.bookname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="isbn"
            name="isbn"
            label="ISBN"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleListData}
            value={listData.isbn}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            variant="standard"
            fullWidth
            onChange={handleListData}
            value={listData.price}
          />
        </Grid>
        <Grid item xs={12}>
          <input type="file" onChange={(e)=>setCoverFile(e.target.files[0])}/>
        </Grid>
        <Button onClick={hanldeSubmit}>Create</Button>
      </Grid>
      </Box>
    </React.Fragment>
  );
}