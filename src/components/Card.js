import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFirebase } from '../context/Firebase';

export default function BookCard(props) {
    const firebase = useFirebase();
    const [url,setUrl] = React.useState('');
    React.useEffect(()=>{
        firebase.getImageURL(props.imageURL).then((url)=>setUrl(url));
    },[]);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height:  350}}
        image={url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.bookname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The book title is {props.bookname} and  price of this book {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Buy</Button>
      </CardActions>
    </Card>
  );
}