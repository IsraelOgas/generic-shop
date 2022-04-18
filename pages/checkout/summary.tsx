import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link'

const SummaryPage = () => {
    return (
        <ShopLayout title='Resumen Orden' pageDescription='Resumen detallado de la orden'>
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 productos)</Typography>
                            <Divider sx={ { my: 1 } } />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>Editar</Link>
                                </NextLink>
                            </Box>

                            <Typography>Israel Ogas</Typography>
                            <Typography>Mi Calle</Typography>
                            <Typography>Cod. Postal</Typography>
                            <Typography>Ciudad, Comuna, País</Typography>
                            <Typography>+56 9 87654321</Typography>

                            <Divider sx={ { my: 1 } } />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>Editar</Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={ { mt: 3 } }>
                                <Button color="secondary" className='circular-btn' size='large' fullWidth>Confirmar Orden</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage