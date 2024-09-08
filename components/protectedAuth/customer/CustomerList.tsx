'use client';
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { host } from '@/lib/data'
import { useSession } from 'next-auth/react';
import { jwtDecode } from "jwt-decode";
import { LogOut } from '@/actions/logout';
import FilterBox from './FilterBox'
import CustomerTable from './CustomerTable';

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
    <div className="md:flex w-full">
      <FilterBox
        searchCustomer={searchCustomer}
        handleSearchData={handleSearchData}
        set_searchCustomer={set_searchCustomer}
      />
      <div className="max-h-[500px] border-collapse overflow-y-auto">
        <CustomerTable
          customer={customer}
        />
      </div>
    </div>
  );
};

export default CustomerList;