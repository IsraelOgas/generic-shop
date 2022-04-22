import { Typography, Box } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
    return (
        <ShopLayout title={ 'Generic-Shop - Search' } pageDescription={ 'Encuentra los mejores productos' }>
            <Typography variant='h1' component='h1'>
                Buscar Productos
            </Typography>

            {
                foundProducts
                    ? <Typography variant='h5' sx={ { mb: 1 } } textTransform='capitalize'>Término: { query }</Typography>
                    : (<Box display='flex' gap={1}>
                        <Typography variant='h5' sx={ { mb: 1 } }>No encontramos ningún producto</Typography>
                        <Typography variant='h5' sx={ { mb: 1 } } color='secondary' textTransform='capitalize'>{ query }</Typography>
                    </Box>)
            }

            <ProductList products={ products } />
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string }

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query)
    const foundProducts = products.length > 0
    // Puede que exista el caso de que no hay productos de lo buscado
    // TODO: mostrar productos sugeridos

    if(!foundProducts) {
        // se puede reemplazar esto para sugerir otros productos en caso de que el usuario no encuentre lo que busca
        products = await dbProducts.getAllProducts()
    }


    return {
        props: {
            products,
            foundProducts,
            query,
        }
    }
}

export default SearchPage
