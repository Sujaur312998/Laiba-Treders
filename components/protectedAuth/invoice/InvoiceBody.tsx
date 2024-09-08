import { Input } from '@/components/ui/input';
import { MdDelete } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

interface InvoiceProductListProps {
  handleProductChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => void;
  handleProductDelete: (index: number) => void;
  handleProductAdd: (index: number) => void;
  productList: Product[];
  paymentInfo: PaymentInfo;
  subTotal: number;
  totalTax: number;
  totalDiscount: number;
  handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}

const InvoiceBody: React.FC<InvoiceProductListProps> = ({ handleProductChange, handleProductDelete, handleProductAdd, productList, paymentInfo, subTotal, totalTax, totalDiscount, handlePaymentChange }) => {
  return (
    <div>
      {/* 1st Section */}
      <section className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead className='w-60'>Products</TableHead>
              <TableHead className='w-24'>Quantity</TableHead>
              <TableHead className='w-24'>Size</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-center">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    name='productName'
                    value={item.productName}
                    onChange={(e) => handleProductChange(e, index)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    name='productQuality'
                    type='number' min='0'
                    value={item.productQuality}
                    onChange={(e) => handleProductChange(e, index)}
                  />
                </TableCell>
                <TableCell>
                  <select
                    name="productSize"
                    value={item.productSize}
                    className='block w-full py-2 px-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-1 cursor-pointer focus:ring-black focus:border-black transition duration-150 ease-in-out bg-white'
                    onChange={(e) => handleProductChange(e, index)}
                  >
                    <option hidden>Select</option>
                    <option value="k.g.">k.g.</option>
                    <option value="gm">gm</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                    <option value="Packet">Packet</option>
                    <option value="Box">Box</option>
                    <option value="Beg">Beg</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Input
                    name='productUnitPrice'
                    type='number' min='0'
                    value={item.productUnitPrice}
                    onChange={(e) => handleProductChange(e, index)}
                  />
                </TableCell>
                <TableCell className='text-right'>{item.productQuality * item.productUnitPrice}</TableCell>
                <TableCell className='flex gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-lime-600 hover:text-white hover:bg-lime-600'
                    onClick={() => handleProductAdd(index)}
                  >
                    <TiPlus />
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-red-600 hover:text-white hover:bg-red-600'
                    onClick={() => handleProductDelete(index)}
                  >
                    <MdDelete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      {/* 2nd Section */}
      <section className="mb-8 text-right">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold mb-4">Payment Info</h3>
        </div>

        <Table>
          <TableBody>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='text-left col-span-3'>Sub Total</TableCell>
              <TableCell className='col-span-9'>{subTotal}</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='text-left col-span-3'>Tax</TableCell>
              <TableCell className='text-right col-span-3'>
                <div>
                  <select
                    name="taxin"
                    value={paymentInfo.taxin}
                    onChange={(e) => handlePaymentChange(e)}
                    className='block w-full py-2 px-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-1 cursor-pointer focus:ring-black focus:border-black transition duration-150 ease-in-out bg-white'
                  >
                    <option value="TK">TK</option>
                    <option value="%">%</option>
                  </select>
                </div>
              </TableCell>
              <TableCell className='col-span-3'>
                <Input
                  type='number' min='0'
                  name='tax'
                  value={paymentInfo.tax}
                  onChange={(e) => handlePaymentChange(e)}
                />
              </TableCell>
              <TableCell className='col-span-3'>
                {totalTax}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='text-left col-span-3'>Discount</TableCell>
              <TableCell className='col-span-3'>
                <select
                  name="discountin"
                  value={paymentInfo.discountin}
                  onChange={(e) => handlePaymentChange(e)}
                  className='block w-full py-2 px-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-1 cursor-pointer focus:ring-black focus:border-black transition duration-150 ease-in-out bg-white'
                >
                  <option value="TK">TK</option>
                  <option value="%">%</option>
                </select>
              </TableCell>
              <TableCell className='col-span-3'>
                <Input
                  type='number' min='0'
                  value={paymentInfo.discount}
                  name='discount'
                  onChange={(e) => handlePaymentChange(e)}
                />
              </TableCell>
              <TableCell className='col-span-3'>{totalDiscount}</TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='col-span-3 text-left'>Total (Total + Tax - Discount)</TableCell>
              <TableCell className='col-span-9'>
                {subTotal + totalTax - totalDiscount}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='text-left col-span-3'>Paid</TableCell>
              <TableCell className='col-span-6'>
                <Input
                  value={paymentInfo.paid}
                  name='paid'
                  type='number' min='0'
                  onChange={(e) => handlePaymentChange(e)}
                />
              </TableCell>
              <TableCell className='col-span-3'>
                {paymentInfo.paid}
              </TableCell>
            </TableRow>
            <TableRow className='grid grid-cols-12'>
              <TableCell className='text-left col-span-3'>Due</TableCell>
              <TableCell className='col-span-9'>
                {subTotal + totalTax - totalDiscount - paymentInfo.paid}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

export default InvoiceBody;
