import React, { useContext, useState } from 'react'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps
} from 'next'
import { ShopLayout } from '../../components/layouts'
import { ProductSizeSelector, ProductSlideshow } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProducts } from '../../database'
import { useRouter } from 'next/router'
import { CartContext } from '../../context'

interface Props {
  product: IProduct
}

const MAX_QUANTITY_BY_USER = 10

const ProductPage: NextPage<Props> = ({ product }) => {
  const router= useRouter()
  const { addProductToCart } = useContext( CartContext )

  // const { query } = useRouter()

  // const { products: product, isLoading } = useProducts(`/products/${query.slug}`)

  // if(isLoading) {
  //   return <h1>Cargando...</h1>
  // }

  // if(!product) {
  //   return <h1>No eixste</h1>
  // }

  const [ tempCartProduct, setTempCartProduct ] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[ 0 ],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size,
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity,
    }))
  }

  const onAddProduct = () => {
    if (!tempCartProduct.size) return
    
    addProductToCart(tempCartProduct)
    router.push('/cart')
  }

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } sm={ 7 }>
          <ProductSlideshow images={ product.images } />
        </Grid>
        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>

            {/* Titulos */ }
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>{ `$${ product.price } ` }</Typography>

            {/* Cantidad */ }
            <Box sx={ { my: 2 } }>
              <Typography variant='subtitle2'>Cantidad</Typography>

              <ItemCounter
                currentValue={ tempCartProduct.quantity }
                updateQuantity={ onUpdateQuantity }
                maxValue={ product.inStock > MAX_QUANTITY_BY_USER ? MAX_QUANTITY_BY_USER : product.inStock }
              />

              <ProductSizeSelector
                selectedSize={ tempCartProduct.size }
                sizes={ product.sizes }
                // onSelectedSize={ (size) => onSelectedSize(size) }
                onSelectedSize={ onSelectedSize }
              />
            </Box>

            {/* Agregar al carro */ }
            {
              (product.inStock > 0)
                ? (
                  <Button
                    color='secondary'
                    className='circular-btn'
                    size='medium'
                    onClick={ onAddProduct }
                  >
                    {
                      tempCartProduct.size
                        ? 'Agregar al carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
                ) : (
                  <Chip label='No hay disponibles' color='error' variant='outlined' size='medium' />
                )
            }

            {/* Descripci??n */ }
            <Box sx={ { mt: 3 } }>
              <Typography variant='subtitle2'>Descripci??n</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// ------------- NO USAR ESTO -----------

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = '' } = params as { slug: string }
//   const product = await dbProducts.getProductsBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product,
//     }
//   }
// }

// You should use getStaticPaths if you???re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      }
    })),
    // [
    //   {
    //     params: {

    //     }
    //   }
    // ],
    fallback: 'blocking'
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user???s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast ??? getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductsBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage