import Select, { Props, components } from 'react-select'

const customStyles = {
  control: (css: any) => ({ ...css, paddingLeft: '0.5rem' }),
}

const controlStyles = {
  base: "border rounded-lg bg-white hover:cursor-pointer",
  focus: "border-primary-600 ring-1 ring-primary-500",
  nonFocus: "border-gray-300 hover:border-gray-400",
};

export default function ReactSelect(props: Props) {
  return (
    <Select
      instanceId={props.id}
      aria-activedescendant={undefined}
      {...props}
      components={{
        ...props.components,
        Input: (props) => (
          <components.Input {...props} aria-activedescendant={undefined} />
        ),
      }}
      styles={customStyles}
      classNames={{
        control: ({ isFocused }) => `${controlStyles.base} ${isFocused ? controlStyles.focus : controlStyles.nonFocus}`
      }}
    />
  )
}