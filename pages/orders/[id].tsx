import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material"

const OrderPage = () => {
    return (
        <ShopLayout title='Resumen de la orden 1122334455' pageDescription='Resumen de la orden'>
            <Typography variant='h1' component='h1'>Orden: 1122334455</Typography>
            <Divider sx={ { my: 1 } } />

            {/* <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={ <CreditCardOffOutlined /> }
            /> */}
            <Chip
                sx={ { my: 2 } }
                label='Orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={ <CreditScoreOutlined /> }
            />
            <Grid container>
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
                                <Typography variant='h2'>Pagar</Typography>
                                <Chip
                                    sx={ { my: 2 } }
                                    label='Orden ya fue pagada'
                                    variant='outlined'
                                    color='success'
                                    icon={ <CreditScoreOutlined /> }
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage