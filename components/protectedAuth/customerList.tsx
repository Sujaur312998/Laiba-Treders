'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Axios from 'axios'
import { useState, useEffect, Key } from 'react'
import { host, villageName } from '@/lib/data'
import { useSession } from 'next-auth/react';
import { jwtDecode } from "jwt-decode";
import { LogOut } from '@/actions/logout';
import { FiFilter } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { Input } from '@/components/ui/input'

const CustomerList = () => {
  const [filterCustomer, setFilterCustomer]: any = useState(false)
  const [customer, setCustomer]: any = useState([])
  const [searchCustomer, set_searchCustomer]: any = useState({
    phoneNo: '', address_village: ""
  })
  let session: any = useSession();
  let accessToken: any = session.data?.accessToken


  const handleSearchData = (name: any, value: string) => {
    const searchData = {
      ...searchCustomer,
      [name]: value
    }
    set_searchCustomer(searchData)
  }

  useEffect(() => {
    if (accessToken) {
      const jwttoken: any = jwtDecode(accessToken)
      searchCustomer.accessToken = accessToken
      if (jwttoken.exp * 1000 > new Date().getTime()) {
        Axios.post(`${host}/api/customer/getCustomer`, searchCustomer)
          .then(res => {
            setCustomer(res.data);
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        LogOut()
      }
    }
  }, [accessToken, searchCustomer])

  return (
    <div className="md:flex w-full ">
      <div className=" py-1 md:w-44 text-center text-sm mx-1">
        <p className="text-gray-500 ">
          <FiFilter className="inline-flex" /> Filter Customer
        </p>
        <div className="mt-2">
          <select
            name="address_village"
            value={searchCustomer.address_village}
            onChange={(e) => handleSearchData(e.target.name, e.target.value)}
            className="block w-full py-2 px-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-1 cursor-pointer focus:ring-black focus:borde-black transition duration-150 ease-in-out bg-white"
          >
            {
              villageName?.map((item, index) => {
                return <option
                  key={index}
                  hidden={item.hidden}
                  value={item.value}
                >
                  {item.village}
                </option>
              })
            }
          </select>
          <Input
            name="phoneNo"
            className="my-2"
            placeholder="Phone Number"
            value={searchCustomer.phoneNo}
            onChange={(e) => handleSearchData(e.target.name, e.target.value)}
          />
          <Button variant='secondary' onClick={() => set_searchCustomer({
            phoneNo: '', address_village: ""
          })} >Clear All</Button>
        </div>

      </div>

      <div className="h-[500px] border-collapse  overflow-auto">
        <Table >
          <TableHeader>
            <TableRow >
              <TableHead >Serial</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Father Name</TableHead>
              <TableHead >Phone Number</TableHead>
              <TableHead >Village</TableHead>
              <TableHead >Home</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {
              customer?.map((item: any, index: any) => {
                let address_village: any = villageName.find(f_item => f_item.value == item.address_village)
                return (
                  <TableRow key={index} >
                    <TableCell className="font-mono">{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.f_name}</TableCell>
                    <TableCell >{item.phoneNo}</TableCell>
                    <TableCell >{address_village.village}</TableCell>
                    <TableCell >{item.address_home}</TableCell>

                    <TableCell className="flex" >
                      <Button variant='link' size='sm' className=" hover:text-green-600" >
                        Promot
                      </Button>
                      <Button variant='link' size='sm' className="hover:text-rose-500" >
                        Demot
                      </Button>
                      <Button variant='ghost' className="hover:text-lime-700" >
                        <AiFillEdit />
                      </Button>
                      <Button variant='ghost' className="hover:text-rose-500" >
                        <MdDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
          <TableCaption >Customer List of Laiba Treders</TableCaption>
        </Table>
      </div>

    </div>
  )
}


export default CustomerList