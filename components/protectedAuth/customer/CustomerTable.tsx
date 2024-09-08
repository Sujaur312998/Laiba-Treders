import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { villageName } from '@/lib/data';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";


interface Customer {
    name: string;
    f_name: string;
    phoneNo: string;
    address_village: string;
    address_home: string;
  }
interface CustomerTableProps {
    customer: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customer }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Serial</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Father Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Home</TableHead>
                    <TableHead>Taile Ledger</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customer.map((item, index) => {
                    const address_village = villageName.find(f_item => f_item.value === item.address_village);
                    return (
                        <TableRow key={index}>
                            <TableCell className="font-mono">{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.f_name}</TableCell>
                            <TableCell>{item.phoneNo}</TableCell>
                            <TableCell>{address_village?.village}</TableCell>
                            <TableCell>{item.address_home}</TableCell>
                            <TableCell>
                                <Button variant='secondary' size='sm' className="hover:text-green-600">
                                    Ledger
                                </Button>
                            </TableCell>
                            <TableCell className="flex">
                                <Button variant='link' size='sm' className="hover:text-green-600">
                                    Promote
                                </Button>
                                <Button variant='link' size='sm' className="hover:text-rose-500">
                                    Demote
                                </Button>
                                <Button variant='ghost' className="hover:text-lime-700">
                                    <AiFillEdit />
                                </Button>
                                <Button variant='ghost' className="hover:text-rose-500">
                                    <MdDelete />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableCaption>Customer List of Laiba Traders</TableCaption>
        </Table>
    );
};

export default CustomerTable;
