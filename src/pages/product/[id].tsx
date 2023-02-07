import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths , GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import Stripe from "stripe";


interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaculPriceId: string;
    }
}

export default function Product({product}: ProductProps) {
const [isCreatingChekoutSession, setIsCreatingChekoutSession ] = useState(false)

 async function handleBuyProduct () {
    try{ 
        setIsCreatingChekoutSession(true);
        const response = await axios.post('/api/checkout', {
            priceId: product.defaculPriceId,
        })

        const {checkoutUrl} = response.data;

        

        window.location.href = checkoutUrl;
    }catch(error){
        //Conectar 
        setIsCreatingChekoutSession(false);

        alert('Falha ao redirecionar ao checkout')
    }
   
}    

    return(
        <>
         <Head>
        <title>{product.name} |IgniteShop</title>
        </Head>

       <ProductContainer>
        <ImageContainer>
           <Image src={product.imageUrl} height={480} width={520} alt=""/>
        </ImageContainer>
        
        <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.price}</span>
            <p>{product.description}</p>
            <button disabled={isCreatingChekoutSession} onClick={handleBuyProduct}>Comprar Agora</button>
        </ProductDetails>

       </ProductContainer>
       </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
      paths: [
        {
          params: { id: 'prod_NJGV4zZA82ELpm' }
        }
      ],
      fallback: 'blocking',
    }
  }

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {
    
    const productId =  params?.id; 
    const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
    });
    const price =  product.default_price as Stripe.Price

    if(price.unit_amount)
    
    return{
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                url: product.url,
                price: new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(price.unit_amount /100),
                description: product.description,
                defaculPriceId: price.id,
            }
        },
       
    }
}