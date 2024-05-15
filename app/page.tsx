"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";

import data from "@/data/data.json";
import { useCallback, useEffect, useState } from "react";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";

import { useCartContext } from "./context/cart-provider";

export default function Home() {
  const router = useRouter();
  const page_param = useSearchParams().get('page');

  const [page, setPage] = useState<number>(1);
  const [bHasMoreProducts, setHasMoreProducts] = useState<boolean>(true);
  const [productData, setProductData] = useState<any[]>([]); // json is too long for me to determine the type, so I'll just use any
  const pageSize = 4;

  const { name, setName } = useCartContext();

  const [buttonClicked, setButtonClicked] = useState<boolean[]>(productData.map(() => false));

  const handleAddToCart = (product: any, index: number) => {
    // console.log(product);
    addItemToCart(product);
    setButtonClicked(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setTimeout(() => {
      setButtonClicked(prevState => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }, 1000);
  };

  useEffect(() => {
    if (page_param) {
      const newPage = parseInt(page_param);
      setPage(newPage);
      setFirst((newPage - 1) * pageSize);
      setRows(pageSize);
    }
  }, [page_param]);

  const fetchData = (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    if (end >= data.products.length) {
      setHasMoreProducts(false);
    }
    return data.products.slice(start, end);
  }

  useEffect(() => {
    // console.log(fetchData(page, pageSize));
    setProductData(fetchData(page, pageSize));
  }, [page]);

  // const handleNextPage = () => {
  //   setPage(prevPage => bHasMoreProducts ? prevPage + 1 : prevPage);
  // }

  // const handlePrevPage = () => {
  //   setHasMoreProducts(true);
  //   setPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  // }

  const [first, setFirst] = useState<number>(page - 1);
  const [rows, setRows] = useState<number>(pageSize);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  // const navigateToDetails = (productCode: string) => () => {
  //   router.push(`/details/${productCode}?prevpage=${page}`);
  // }

  // get text content from html string so that "..." can be added to the end of the string
  const stripHtml = (html: string) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  const addItemToCart = useCallback((product: any) => {
    // console.log("adding to cart");
    // console.log(product);
    if (!product.name) {
      setName(prevName => [...prevName, "missing name"]);
    } else {
      setName(prevName => [...prevName, product.name]);
    }
  }, [setName]);

  return (
    <div className="mx-20 space-y-6 mb-20">
      <div className="grid grid-cols-2 [&>*]:mr-4 [&>*]:mb-4">
        {productData.map((product, index) => (
          <Card key={index} title={product.name ? product.name : "missing name"}>
            <div className="flex flex-col">
              {/* show "..." for long descriptions */}
              <p>{stripHtml(product.description).substring(0, 100) + (stripHtml(product.description).length > 100 ? "..." : "")}</p>
              <p className="mt-2">Price: {product.price ? product.price?.formattedValue : "missing price"}</p>
              <div>
                <Link href={`/details/${product.code}?prevpage=${page}`}>
                  <Button label="View Details" className="mt-4 mr-2" />
                </Link>
                <Button className="mt-4 font-bold" onClick={() => handleAddToCart(product, index)}>
                  {buttonClicked[index] ? <><i className="pi pi-check"></i> Added to Cart</> : "Add to Cart"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {/* <div className="space-x-2">
          <Button label="Previous Page" onClick={handlePrevPage} />
          <Button label="Next Page" onClick={handleNextPage} />
        </div> */}
      <div className="fixed bottom-0 left-0 w-full">
        <Paginator first={first} rows={rows} totalRecords={data.products.length} onPageChange={onPageChange}></Paginator>
      </div>
    </div>
  );
}