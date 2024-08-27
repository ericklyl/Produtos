import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ProductItem({ item }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Link to={`/productDetails/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={item.img}
                        alt={item.nome}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.preco}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}
