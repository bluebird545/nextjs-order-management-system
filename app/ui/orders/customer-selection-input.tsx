import { ControlProps, components } from "react-select";
import ReactSelect from "../select";
import { UserIcon } from "@heroicons/react/24/outline";
import { ICustomer } from "@/app/lib/data/Customer";

type Props = {
  customers: ICustomer[]
  seletedCustomerId?: number
  onCustomerChange: Function
}

export default function CustomerSelectionInput({ customers, seletedCustomerId, onCustomerChange }: Props) {
  const selectOptions = customers.map((customer: any) => ({ value: customer.id, label: `${customer.first_name} ${customer.last_name}`, ...customer }))
  
  const defaultValue = selectOptions.find((option: any) => option.value === seletedCustomerId)

  const handleSelect = (value: any) => {
    onCustomerChange('customerId', value.id)
  }

  return (
    <div className="mb-4">
      <label htmlFor="" className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Select a Customer</label>

      <ReactSelect
        id="customerId"
        name="customerId"
        placeholder='Select customer'
        options={selectOptions}
        defaultValue={defaultValue}
        onChange={handleSelect}
        components={{
          Control: ({children, ...props}: ControlProps) => (
            <components.Control {...props}>
              <UserIcon className="w-6 h-6 text-blue-200" />
              {children}
            </components.Control>
          )
        }}
      />
    </div>
  )
}