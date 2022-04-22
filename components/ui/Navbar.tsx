import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ClearOutlined, SearchOutlined, ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { UIContext } from '../../context'

export const Navbar = () => {

    const { asPath, push } = useRouter()
    const { toggleSideMenu } = useContext(UIContext)

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return

        push(`/search/${ searchTerm }`)
    }

    const [ searchTerm, setSearchTerm ] = useState('')
    const [ isSearchVisible, setIsSearchVisible ] = useState(false)

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

                <Box sx={ {
                    display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }
                } }
                    className="fadeIn"
                >
                    <NextLink href='/category/men' passHref>
                        <Link>
                            <Button color={ asPath === '/category/men' ? 'primary' : 'info' }>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref>
                        <Link>
                            <Button color={ asPath === '/category/women' ? 'primary' : 'info' }>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kids' passHref>
                        <Link>
                            <Button color={ asPath === '/category/kids' ? 'primary' : 'info' }>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>


                <Box flex='1' />

                {/* md screens */ }
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={ {
                                    display: { xs: 'none', sm: 'flex' }
                                } }
                                className='fadeIn'
                                type='text'
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm(e.target.value) }
                                onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                placeholder="Buscar..."
                                autoFocus
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        ) : (
                            <IconButton
                                sx={ { display: { xs: 'none', sm: 'flex' } } }
                                className='fadeIn'
                                onClick={ () => setIsSearchVisible(true) }
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }


                {/* xs screens */ }
                <IconButton
                    sx={ { display: { xs: 'flex', sm: 'none' } } }
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <Badge badgeContent={ 2 } color='secondary'>
                            <ShoppingCartCheckoutOutlined />
                        </Badge>
                    </Link>
                </NextLink>

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}
