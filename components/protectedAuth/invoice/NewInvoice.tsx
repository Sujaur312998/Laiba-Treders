'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import InvoiceHeader from './invoiceHeader';
import InvoiceBody from './InvoiceBody';
import InvoiceFooter from './InvoiceFooter';

const Invoice: React.FC = () => {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);

  interface PaymentInfo {
    taxin: string;
    tax: number;
    discountin: string;
    discount: number;
    paid: number;
    due: number;
  }

  interface Product {
    productName: string;
    productQuality: number;
    productSize: string;
    productUnitPrice: number;
  }

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    taxin: 'TK',
    tax: 0,
    discountin: 'TK',
    discount: 0,
    paid: 0,
    due: 0
  });

  const [productList, setProductList] = useState<Product[]>([
    {
      productName: "",
      productQuality: 0,
      productSize: "",
      productUnitPrice: 0
    }
  ]);

  useEffect(() => {
    let total: number = 0;
    productList.forEach((item) => {
      total += item.productQuality * item.productUnitPrice;
    });
    setSubTotal(total);
  }, [productList]);

  useEffect(() => {
    const tax = paymentInfo.taxin === 'TK' ? paymentInfo.tax : (subTotal * paymentInfo.tax) / 100;
    const discount = paymentInfo.discountin === 'TK' ? paymentInfo.discount : (subTotal * paymentInfo.discount) / 100;
    setTotalTax(tax);
    setTotalDiscount(discount);
  }, [paymentInfo, subTotal]);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value
    });
  };

  const handleProductAdd = (index: number) => {
    const list = [
      ...productList,
      {
        productName: "",
        productQuality: 0,
        productSize: "",
        productUnitPrice: 0
      }
    ];
    setProductList(list);
  };

  const handleProductDelete = (index: number) => {
    const list = [...productList];
    if (list.length > 1) {
      list.splice(index, 1);
      setProductList(list);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...productList];
    list[index] = {
      ...list[index],
      [name]: value
    };
    setProductList(list);
  };

  return (
    <div className="font-mono text-gray-800 bg-white p-8 max-w-4xl mx-auto shadow-lg rounded-lg">
      <InvoiceHeader />
      <InvoiceBody 
        handleProductChange={handleProductChange}
        handleProductDelete={handleProductDelete}
        handleProductAdd={handleProductAdd}
        productList={productList}
        paymentInfo={paymentInfo}
        subTotal={subTotal}
        totalTax={totalTax}
        totalDiscount={totalDiscount}
        handlePaymentChange={handlePaymentChange}
      />
      <InvoiceFooter />
      <div className='text-center mb-8'>
        <Button size='lg'>Submit Invoice</Button>
      </div>
    </div>
  );
};

export default Invoice;
