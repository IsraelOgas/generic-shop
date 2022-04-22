import { LocalDiningOutlined } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { IProduct } from '../../interfaces';
import NextLink from 'next/link';

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [ isHovered, setIsHovered ] = useState(false)
    const [ isImageLoaded, setIsImageLoaded ] = useState(false)
    const productImage = useMemo(() => {
        return isHovered && product.inStock !== 0 ?
            `/products/${ product.images[ 1 ] }`
            : `/products/${ product.images[ 0 ] }`
    }, [ isHovered, product.images, product.inStock ])

    return (
        <Grid item xs={ 6 } sm={ 4 }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <Card>
                <NextLink href={ `/product/${ product.slug }` } passHref prefetch={ false }>
                    <Link>
                        <CardActionArea>
                            {
                                product.inStock === 0 && (
                                    <Chip
                                        label='No hay disponibles'
                                        color='primary'
                                        sx={ { position: 'absolute', zIndex: 99, top: 10, left: 10 } }
                                    />
                                )
                            }
                            <CardMedia
                                sx={ {
                                    borderRadius: 2,
                                    filter: product.inStock === 0 ? 'opacity(0.2)' : 'opacity(1)',
                                } }
                                style={{}}
                                className='fadeIn'
                                component='img'
                                image={ productImage }
                                alt={ product.title }
                                onLoad={ () => setIsImageLoaded(true) }
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box sx={ { mt: 1, display: isImageLoaded ? 'block' : 'none' } } className='fadeIn'>
                <Typography fontWeight={ 700 }>{ product.title }</Typography>
                <Typography fontWeight={ 400 }>{ `$${ product.price }` }</Typography>
            </Box>
        </Grid>
    )
}
