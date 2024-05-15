"use client";
import data from "@/data/data.json";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "primereact/button";
import { useCartContext } from "@/app/context/cart-provider";

const ProductDetails = ({ params }: { params: { productCode: string } }) => {
    const router = useRouter();
    const productCode = params.productCode[0];
    const prevpage_param = useSearchParams().get('prevpage');

    const { name, setName } = useCartContext();

    const fetchData = (productCode: string) => {
        return data.products.find(product => product.code === productCode); // assuming product code is unique
    }

    const [productData, setProductData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const product = fetchData(productCode);
        setProductData(product);
        setIsLoading(false);
    }, [productCode]);

    const goBack = () => {
        router.push(`/?page=${prevpage_param}`);
    }

    return (
        <div className="mx-20">
            {isLoading ? (
                <div>Loading...</div>
            ) : productData ? (
                <div>
                    <Button onClick={goBack}>Go Back</Button>
                    <p className="my-5 text-xl font-bold">{productData.name ? productData.name : "missing name"}</p>
                    <p className="mb-2">Price: {productData.price ? productData.price?.formattedValue : "missing price"}</p>
                    <div dangerouslySetInnerHTML={{ __html: productData.description }} />
                    <Button className="my-4" onClick={() => setName([...name, productData.name ? productData.name : "missing name"])}>
                        Add to cart
                    </Button>
                </div>
            ) : (
                <div>Product not found</div>
            )}
        </div>
    )
}

export default ProductDetails