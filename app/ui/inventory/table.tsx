import { IProduct } from "@/app/lib/data/Product"
import Table from "@/app/ui/table/index"
import TableHead from "@/app/ui/table/tablehead"
import TableBody from "@/app/ui/table/tablebody"
import TableRow from "@/app/ui/table/tablerow"
import Image from "next/image"
import { EllipsisHorizontalIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import NoDataError from "@/app/ui/no-data"

type ProductsTableProps = {
  products: IProduct[]
}

export default function ProductsTable({ products }: ProductsTableProps) {

  const columns = [
    { label: '', accessor: 'image', sortable: false },
    { label: 'Product Name', accessor: 'name', sortable: true },
    { label: 'Price', accessor: 'price', sortable: true },
    { label: 'Category', accessor: 'category',  sortable: true },
    { label: 'Stock', accessor: 'stock', sortable: false },
  ]

  if (!products) {
    return (
      <NoDataError type="Inventory" />
    )
  }
  
  return (
    <Table>
      <TableHead {...{columns}} />

      <TableBody>
        {
          products.map((product,i) => {
            return (
              <TableRow key={i}>
                <td>
                  <div className="mx-auto border rounded-md h-10 w-10 overflow-hidden">
                    <Image src={product.image} width={50} height={50} alt={`Image of product ${product.name}`} className="w-full h-full object-cover object-center" />
                  </div>
                </td>

                <td className="px-6 py-4 inline-flex items-center">
                  <div className="max-w-64">
                    <p className="truncate ...">{product.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  {product.category}
                </td>
                <td className="px-6 py-4">
                  10
                </td>
                <td>
                  <EllipsisVerticalIcon className="w-6 h-6 mx-auto" />
                </td>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}