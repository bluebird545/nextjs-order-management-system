import { ICustomer } from "@/app/lib/data/Customer"
import Table from "@/app/ui/table/index"
import TableHead from "@/app/ui/table/tablehead"
import TableBody from "@/app/ui/table/tablebody"
import TableRow from "@/app/ui/table/tablerow"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import NoDataError from "@/app/ui/no-data"

type Props = {
  customers: ICustomer[]
}

export default function CustomersTable({ customers }: Props) {
  const columns = [
    { label: 'Name', accessor: 'first_name', sortable: true },
    { label: 'Email', accessor: 'email', sortable: false },
    { label: 'Phone', accessor: 'phone', sortable: false },
    { label: 'Address', accessor: 'address_street_one', sortable: false },
  ]

  if (!customers) {
    return (
      <NoDataError type="Customers" />
    )
  }

  return (
    <Table>
      <TableHead {...{columns}} />

      <TableBody>
        {
          customers.map(({ first_name, last_name, email, phone, address_street_one, address_street_two, address_city, address_state, address_zipcode } ,i ) => (
            <TableRow key={i}>
              <td className="px-6 py-4">{first_name} {last_name}</td>
              <td className="px-6 py-4">{email}</td>
              <td className="px-6 py-4">{phone}</td>
              <td className="px-6 py-4">
                <p>{address_street_one}</p>
                <p>{address_street_two}</p>
                <p>{address_city}, {address_state}</p>
              </td>
              <td>
                  <EllipsisVerticalIcon className="w-6 h-6 mx-auto" />
                </td>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}