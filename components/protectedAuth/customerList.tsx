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
import { host } from '@/lib/data'
import { useSession } from 'next-auth/react';
import { jwtDecode } from "jwt-decode";
import { LogOut } from '@/actions/logout';
import { FiFilter } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import {villageName} from '@/lib/data'

const CustomerList = () => {
  const [filterCustomer, setFilterCustomer]: any = useState(false)
  const [customer, setCustomer]: any = useState([])
  let session: any = useSession();
  let accessToken: any = session.data?.accessToken

  useEffect(() => {
    if (accessToken) {
      const jwttoken: any = jwtDecode(accessToken)
      if (jwttoken.exp * 1000 > new Date().getTime() || jwttoken.role === 'NEW_CUSTOMER') {
        Axios.post(`${host}/api/customer/getCustomer`, { accessToken })
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
  }, [accessToken])

  // const cc = [
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "eade10f7-279c-4f49-9e14-cb90af521640",
  //     "name": "মো সুজাউর রহমান",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1518956022,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "e4a7c279-b340-4c10-b0a4-f40392bf18c6",
  //     "name": "লাইবা আফরিন রাহা",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1725303305,
  //     "address_village": "dhamoir",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "2fa0fd0b-ad0e-4911-a306-3934cb2402ff",
  //     "name": "মজিদ সরকার",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1714946534,
  //     "address_village": "Isail",
  //     "address_home": "গোয়াপাড়া"
  //   },
  //   {
  //     "id": "29a81c4f-32a8-4c8d-80a8-f10903528ef7",
  //     "name": "মিসেস শেফালি খাতুন",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1521250639,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "1c0d8ec2-6666-42d2-813b-ae5bce34b078",
  //     "name": "রিপন",
  //     "f_name": "জগদিশ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1832103533,
  //     "address_village": "nihalgram",
  //     "address_home": ""
  //   },
  //   {
  //     "id": "75b8a1c3-b519-426e-b8b5-c452e57da598",
  //     "name": "আলিফ",
  //     "f_name": "আক্কাস",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131022,
  //     "address_village": "bottoli",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "eade10f7-279c-4f49-9e14-cb90af521640",
  //     "name": "মো সুজাউর রহমান",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1518956022,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "e4a7c279-b340-4c10-b0a4-f40392bf18c6",
  //     "name": "লাইবা আফরিন রাহা",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1725303305,
  //     "address_village": "dhamoir",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "2fa0fd0b-ad0e-4911-a306-3934cb2402ff",
  //     "name": "মজিদ সরকার",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1714946534,
  //     "address_village": "Isail",
  //     "address_home": "গোয়াপাড়া"
  //   },
  //   {
  //     "id": "29a81c4f-32a8-4c8d-80a8-f10903528ef7",
  //     "name": "মিসেস শেফালি খাতুন",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1521250639,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "1c0d8ec2-6666-42d2-813b-ae5bce34b078",
  //     "name": "রিপন",
  //     "f_name": "জগদিশ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1832103533,
  //     "address_village": "nihalgram",
  //     "address_home": ""
  //   },
  //   {
  //     "id": "75b8a1c3-b519-426e-b8b5-c452e57da598",
  //     "name": "আলিফ",
  //     "f_name": "আক্কাস",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131022,
  //     "address_village": "bottoli",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "eade10f7-279c-4f49-9e14-cb90af521640",
  //     "name": "মো সুজাউর রহমান",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1518956022,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "e4a7c279-b340-4c10-b0a4-f40392bf18c6",
  //     "name": "লাইবা আফরিন রাহা",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1725303305,
  //     "address_village": "dhamoir",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "2fa0fd0b-ad0e-4911-a306-3934cb2402ff",
  //     "name": "মজিদ সরকার",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1714946534,
  //     "address_village": "Isail",
  //     "address_home": "গোয়াপাড়া"
  //   },
  //   {
  //     "id": "29a81c4f-32a8-4c8d-80a8-f10903528ef7",
  //     "name": "মিসেস শেফালি খাতুন",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1521250639,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "1c0d8ec2-6666-42d2-813b-ae5bce34b078",
  //     "name": "রিপন",
  //     "f_name": "জগদিশ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1832103533,
  //     "address_village": "nihalgram",
  //     "address_home": ""
  //   },
  //   {
  //     "id": "75b8a1c3-b519-426e-b8b5-c452e57da598",
  //     "name": "আলিফ",
  //     "f_name": "আক্কাস",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131022,
  //     "address_village": "bottoli",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "eade10f7-279c-4f49-9e14-cb90af521640",
  //     "name": "মো সুজাউর রহমান",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1518956022,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "e4a7c279-b340-4c10-b0a4-f40392bf18c6",
  //     "name": "লাইবা আফরিন রাহা",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1725303305,
  //     "address_village": "dhamoir",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "2fa0fd0b-ad0e-4911-a306-3934cb2402ff",
  //     "name": "মজিদ সরকার",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1714946534,
  //     "address_village": "Isail",
  //     "address_home": "গোয়াপাড়া"
  //   },
  //   {
  //     "id": "29a81c4f-32a8-4c8d-80a8-f10903528ef7",
  //     "name": "মিসেস শেফালি খাতুন",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1521250639,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "1c0d8ec2-6666-42d2-813b-ae5bce34b078",
  //     "name": "রিপন",
  //     "f_name": "জগদিশ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1832103533,
  //     "address_village": "nihalgram",
  //     "address_home": ""
  //   },
  //   {
  //     "id": "75b8a1c3-b519-426e-b8b5-c452e57da598",
  //     "name": "আলিফ",
  //     "f_name": "আক্কাস",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131022,
  //     "address_village": "bottoli",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "eade10f7-279c-4f49-9e14-cb90af521640",
  //     "name": "মো সুজাউর রহমান",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1518956022,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "e4a7c279-b340-4c10-b0a4-f40392bf18c6",
  //     "name": "লাইবা আফরিন রাহা",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1725303305,
  //     "address_village": "dhamoir",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "2fa0fd0b-ad0e-4911-a306-3934cb2402ff",
  //     "name": "মজিদ সরকার",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1714946534,
  //     "address_village": "Isail",
  //     "address_home": "গোয়াপাড়া"
  //   },
  //   {
  //     "id": "29a81c4f-32a8-4c8d-80a8-f10903528ef7",
  //     "name": "মিসেস শেফালি খাতুন",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1521250639,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "1c0d8ec2-6666-42d2-813b-ae5bce34b078",
  //     "name": "রিপন",
  //     "f_name": "জগদিশ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1832103533,
  //     "address_village": "nihalgram",
  //     "address_home": ""
  //   },
  //   {
  //     "id": "75b8a1c3-b519-426e-b8b5-c452e57da598",
  //     "name": "আলিফ",
  //     "f_name": "আক্কাস",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131022,
  //     "address_village": "bottoli",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "eade10f7-279c-4f49-9e14-cb90af521640",
  //     "name": "মো সুজাউর রহমান",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1518956022,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "e4a7c279-b340-4c10-b0a4-f40392bf18c6",
  //     "name": "লাইবা আফরিন রাহা",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1725303305,
  //     "address_village": "dhamoir",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "2fa0fd0b-ad0e-4911-a306-3934cb2402ff",
  //     "name": "মজিদ সরকার",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1714946534,
  //     "address_village": "Isail",
  //     "address_home": "গোয়াপাড়া"
  //   },
  //   {
  //     "id": "29a81c4f-32a8-4c8d-80a8-f10903528ef7",
  //     "name": "মিসেস শেফালি খাতুন",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1521250639,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "1c0d8ec2-6666-42d2-813b-ae5bce34b078",
  //     "name": "রিপন",
  //     "f_name": "জগদিশ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1832103533,
  //     "address_village": "nihalgram",
  //     "address_home": ""
  //   },
  //   {
  //     "id": "75b8a1c3-b519-426e-b8b5-c452e57da598",
  //     "name": "আলিফ",
  //     "f_name": "আক্কাস",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131022,
  //     "address_village": "bottoli",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "6224ab32-4375-41d8-8666-3962fc480737",
  //     "name": "লুৎফর রহমান",
  //     "f_name": "বদির উদ্দিন",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131083,
  //     "address_village": "bottoli",
  //     "address_home": "বাজার"
  //   },
  //   {
  //     "id": "eade10f7-279c-4f49-9e14-cb90af521640",
  //     "name": "মো সুজাউর রহমান",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1518956022,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "e4a7c279-b340-4c10-b0a4-f40392bf18c6",
  //     "name": "লাইবা আফরিন রাহা",
  //     "f_name": "মো লুৎফর রহমান",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1725303305,
  //     "address_village": "dhamoir",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "2fa0fd0b-ad0e-4911-a306-3934cb2402ff",
  //     "name": "মজিদ সরকার",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1714946534,
  //     "address_village": "Isail",
  //     "address_home": "গোয়াপাড়া"
  //   },
  //   {
  //     "id": "29a81c4f-32a8-4c8d-80a8-f10903528ef7",
  //     "name": "মিসেস শেফালি খাতুন",
  //     "f_name": "আব্দুল লতিফ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1521250639,
  //     "address_village": "lokkhipur",
  //     "address_home": "বড়বাড়ি"
  //   },
  //   {
  //     "id": "1c0d8ec2-6666-42d2-813b-ae5bce34b078",
  //     "name": "রিপন",
  //     "f_name": "জগদিশ",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1832103533,
  //     "address_village": "nihalgram",
  //     "address_home": ""
  //   },
  //   {
  //     "id": "75b8a1c3-b519-426e-b8b5-c452e57da598",
  //     "name": "আলিফ",
  //     "f_name": "আক্কাস",
  //     "role": "NEW_CUSTOMER",
  //     "phoneNo": 1729131022,
  //     "address_village": "bottoli",
  //     "address_home": "বড়বাড়ি"
  //   },
  // ]

  return (
    <div className="md:flex w-full gap-2">
      <div className=" py-1 md:w-60 text=-gray-400">
        Filter Customer
      {/* <FiFilter /> */}

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
                let address_village: any = villageName.find(f_item=>f_item.value==item.address_village)  
                return (
                  <TableRow key={index} >
                    <TableCell className="font-mono">{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.f_name}</TableCell>
                    <TableCell >0{item.phoneNo}</TableCell>
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