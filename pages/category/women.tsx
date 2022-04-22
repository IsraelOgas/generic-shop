import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const WomenCategoryPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout title={ 'Generic-Shop - Women' } pageDescription={ 'Encuentra los mejores productos para Mujer' }>
      <Typography variant='h1' component='h1'>
        Mujeres
      </Typography>
      <Typography variant='h2' sx={ {
        mb: 1
      } }>
        Todos los productos para mujeres
      </Typography>

      { isLoading
      ? <FullScreenLoading />
      : <ProductList products={ products } />
     }
    </ShopLayout>
  )
}

export default WomenCategoryPage
