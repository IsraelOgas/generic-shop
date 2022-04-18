import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { SearchOutlined, ShoppingCartCheckoutOutlined } from '@mui/icons-material'

export const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Generic | </Typography>
                        <Typography sx={ {
                            ml: 0.5
                        } }>Shop </Typography>
                    </Link>
                </NextLink>

                <Box flex='1' />

                <Box sx={{ 
                    display: { xs: 'none', sm: 'block' }
                 }}>
                    <NextLink href='/category/men' passHref>
                        <Link>
                            <Button>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref>
                        <Link>
                            <Button>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kids' passHref>
                        <Link>
                            <Button>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>


                <Box flex='1' />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <Badge badgeContent={ 2 } color='secondary'>
                            <ShoppingCartCheckoutOutlined />
                        </Badge>
                    </Link>
                </NextLink>

                <Button>
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}
