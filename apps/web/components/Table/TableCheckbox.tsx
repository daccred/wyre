import { Checkbox } from "@chakra-ui/react";

type TableCheckboxProps = {
  checked: any;
  [x: string]: any;
  onChange?: any;
  title?: string | undefined; 
  indeterminate?: boolean | undefined; 
  style?: any | undefined; 
  className?: string | undefined; 
  role?: string | undefined;
};

const TableCheckbox = ({ indeterminate, checked, ...props } : TableCheckboxProps) => {
  return (
    <Checkbox
      ref={props.indeterminate ? props.checkboxRef : null}
      isIndeterminate={indeterminate}
      isChecked={checked}
      {...props}
    />
  );
};

export default TableCheckbox;
