import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { MinusIcon } from "@heroicons/react/24/outline"
import { PlusIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ReactSelect from "../select"
import { ControlProps, components } from "react-select"
import { useState } from "react"
import Image from "next/image"
import { IOrderItem } from "@/app/lib/data/OrderItem"
import { IProduct } from "@/app/lib/data/Product"

function SelectedProduct({ productIndex, product, onFieldChange }: any) {
  const increaseQty = (id: any) => {
    const MAX_QTY = 5

    if (product.qty === MAX_QTY) return
    onFieldChange('quantity', product.qty += 1, productIndex)
  }

  const decreaseQty = (id: any) => {
    const MIN_QTY = 0

    if (product.qty === MIN_QTY) return
    else onFieldChange('quantity', product.qty -= 1, productIndex)
  }

  return (
    <div className="grid grid-cols-12 items-start gap-x-6 mb-2">
      <div className="col-span-7 flex gap-x-2">
        <div className="border rounded-md h-24 w-24 overflow-hidden">
          <Image src={product?.image || ''} width={100} height={100} alt={`Image of product ${product?.name}`} className="w-full h-full object-cover object-center" />
        </div>

        <div className="flex-1">
          <h3 className="text-sm text-ellipsis ...">{product?.name}</h3>
          <p className="text-xs">In stock: 10</p>
        </div>
      </div>

      <div className="col-span-1">
        <div className="h-11 px-3 py-2.5 text-center text-sm text-slate-500 dark:text-slate-200 border rounded-md border-slate-200 dark:bg-slate-700 dark:border-slate-500 w-full">{product?.price}</div>
      </div>

      <div className="col-span-2">
        <div className="relative flex items-center">
          <button
            type="button"
            className="h-11 px-3 py-2 border rounded-l-md border-slate-200 dark:border-slate-500"
            onClick={() => increaseQty(product.value)}
          >
            <PlusIcon className="w-4 h-4 text-blue-200" />
          </button>
          <input
            type="number"
            // name={`items[0][quantity]`}
            // name={`items[${productIndex}][quantity]`}
            name="quantity"
            id="quantity"
            min={0}
            max={10}
            className="h-11 px-3 py-2.5 text-center text-sm text-slate-500 dark:text-slate-200 border-t border-b border-slate-200 dark:bg-slate-700 dark:border-slate-500 w-full" 
            // defaultValue={product.qty}
            value={product.qty || 0}
          />

          <button
            type="button"
            className="h-11 px-3 py-2 border rounded-r-md border-slate-200 dark:border-slate-500"
            onClick={() => decreaseQty(product.value)}
          >
            <MinusIcon className="w-4 h-4 text-blue-200" />
          </button>
        </div>
      </div>

      <div className="col-span-1">
        <div className="h-11 px-3 py-2.5 text-center text-sm text-slate-500 dark:text-slate-200 border rounded-md border-slate-200 dark:bg-slate-700 dark:border-slate-500 w-full">{(product?.price * product.qty).toFixed(2)}</div>
      </div>

      <div className="col-span-1">
        {/* <button
          type="button"
          className="h-11 px-3 rounded-md bg-red-50 hover:bg-red-100"
          // onClick={() => removeFields(field.id)}
        >
          <XMarkIcon className="w-4 h-4 text-red-600" />
        </button> */}
      </div>
    </div>
  )
}

type Props = {
  canSelectNewProducts?: boolean
  orderItems?: IOrderItem[]
  products?: IProduct[]
  onOrderItemChange: Function
}

export default function ProductSelectInput({ canSelectNewProducts = true, orderItems = [], products = [], onOrderItemChange }: Props) {

  const selectOptions = products?.map((product: any) => ({ value: product.id, label: `Product ${product.id}`, qty: 1, ...product }))

  const defaultValue = orderItems?.map((item: any) => {
    const option = selectOptions?.find((option: any) => item.product_id === option.value)
    return { ...option, qty: item.quantity}
  })

  const [selectedProducts, setSelectedProducts] = useState(defaultValue)

  const handleSelect = (values: any) => {
    setSelectedProducts(values)
    onOrderItemChange('items', values.map((value: any, i: number) => ({ id: value.id, quantity: value.qty })))
  }

  const handleInputChange = (name: string, value: any, index: number) => {
    let data = [...selectedProducts]
    data[index][name] = value

    setSelectedProducts(data)
    onOrderItemChange('items', data.map((value: any, i: number) => ({ id: value.id, quantity: value.qty })))
  }

  return (
    <fieldset className="mb-4">
      <legend className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        Set products
      </legend>

      <div className="px-[14px] py-3 border border-slate-200 dark:bg-slate-700 rounded-md dark:border-slate-500">
        { canSelectNewProducts && (
          <div className="bg-slate-50 p-4">
            <ReactSelect
              id="productId"
              name="productId"
              placeholder="Type to add products"
              // controlShouldRenderValue={false}
              isMulti={true}
              onChange={handleSelect}
              hideSelectedOptions={true}
              options={selectOptions}
              defaultValue={defaultValue}
              components={{
                Control: ({children, ...props}: ControlProps) => (
                  <components.Control {...props}>
                    <MagnifyingGlassIcon className="w-6 h-6 text-blue-200" />
                    {children}
                  </components.Control>
                )
              }}
            />
          </div>

        )}

        { selectedProducts && selectedProducts.length > 0 && (
          <div className="grid grid-cols-12 items-center gap-x-6 mt-4 mb-2">
            <div className="col-span-7 mb-2 text-sm text-slate-500 dark:text-slate-200">Product</div>
            <div className="col-span-1 mb-2 text-sm text-slate-500 dark:text-slate-200">Price</div>
            <div className="col-span-2 mb-2 text-sm text-slate-500 dark:text-slate-200">Quantity</div>
            <div className="col-span-1 mb-2 text-sm text-slate-500 dark:text-slate-200">Total</div>
            <div className="col-span-1 mb-2 text-sm text-slate-500 dark:text-slate-200"></div>
          </div>
        )}

        {
          selectedProducts && selectedProducts.length > 0 && selectedProducts.map((selectedProduct: any, i: number) => (
          <SelectedProduct key={i} productIndex={i} product={selectedProduct} onFieldChange={handleInputChange} />)
        ) }
      </div>
    </fieldset>
  )
}