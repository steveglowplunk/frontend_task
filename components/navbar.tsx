"use client";

import Link from 'next/link';
import { Button } from "primereact/button"
import { OverlayPanel } from 'primereact/overlaypanel';
import { useEffect, useRef } from 'react';

import { useCartContext } from '@/app/context/cart-provider';

const Navbar = () => {
  const op = useRef(null);
  const { name, setName } = useCartContext();

  // hide overlay panel when cart is empty
  useEffect(() => {
    if (name.length === 0) {
      (op.current as OverlayPanel | null)?.hide();
    }
  }, [name]);
  return (
    <nav className="flex bg-white h-16 items-center space-x-2 justify-between px-8 shadow-lg">
      <OverlayPanel ref={op}>
        <div className="flex flex-col space-y-2 min-w-48">
          <p className="text-xl font-bold">Cart</p>
          {name.length > 0 ? (
            <div className="flex flex-col space-y-2">
              {name.map((itemName, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-2 justify-between">
                  <span>{itemName}</span>
                  <Button onClick={() => {
                    // remove item from cart
                    setName(name.filter((_, index) => itemIndex !== index));
                  }} icon="pi pi-times" rounded severity="danger" text />
                </div>
              ))}
              <Button onClick={() => {
                // clear all items from cart
                setName([]);
              }} label="Clear Cart" className="mt-4" />
            </div>
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      </OverlayPanel>
      <Link href="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <i className="pi pi-shop text-2xl" />
          <h1 className="text-2xl font-bold">E-Shop</h1>
        </div>
      </Link>
      <div className="flex items-center space-x-2">
        <Button className="space-x-2" outlined onClick={(e) => (op.current as OverlayPanel | null)?.toggle(e)}>
          <i className="pi pi-shopping-cart" />
          <span>Cart</span>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar