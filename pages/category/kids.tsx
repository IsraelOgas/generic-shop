import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const KidsCategoryPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid')

  return (
    <ShopLayout title={ 'Generic-Shop - Kids' } pageDescription={ 'Encuentra los mejores productos para Niños' }>
      <Typography variant='h1' component='h1'>
        Niños
      </Typography>
      <Typography variant='h2' sx={ {
        mb: 1
      } }>
        Todos los productos para niños
      </Typography>

      { isLoading
      ? <FullScreenLoading />
      : <ProductList products={ products } />
     }
    </ShopLayout>
  )
}

export default KidsCategoryPage
