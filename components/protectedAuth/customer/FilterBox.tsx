import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { villageName } from '@/lib/data';

interface FilterBoxProps {
  searchCustomer: {
    phoneNo: string;
    address_village: string;
  };
  handleSearchData: (name: string, value: string) => void;
  set_searchCustomer: React.Dispatch<React.SetStateAction<{
    phoneNo: string;
    address_village: string;
  }>>;
}

const FilterBox: React.FC<FilterBoxProps> = ({ searchCustomer, handleSearchData, set_searchCustomer }) => {
  return (
    <div className="py-1 md:w-44 text-center text-sm mx-1">
      <p className="text-gray-500">Filter Customer</p>
      <div className="mt-2">
        <select
          name="address_village"
          value={searchCustomer.address_village}
          onChange={(e) => handleSearchData(e.target.name, e.target.value)}
          className="block w-full py-2 px-3 border-2 rounded-md shadow-sm focus:outline-none focus:ring-1 cursor-pointer focus:ring-black focus:border-black transition duration-150 ease-in-out bg-white"
        >
          {villageName?.map((item, index) => (
            <option
              key={index}
              hidden={item.hidden}
              value={item.value}
            >
              {item.village}
            </option>
          ))}
        </select>
        <Input
          name="phoneNo"
          className="my-2"
          placeholder="Phone Number"
          value={searchCustomer.phoneNo}
          onChange={(e) => handleSearchData(e.target.name, e.target.value)}
        />
        <Button
          variant='secondary'
          size='sm'
          onClick={() => set_searchCustomer({
            phoneNo: '', address_village: ""
          })}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default FilterBox;
