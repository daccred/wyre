import { chakra, Button, Stack } from "@chakra-ui/react";
import Ajv from "ajv";
import type { JSONSchema7 } from "json-schema";
import React from "react";

import FormCheckbox from "./FormCheckbox";
import { FormInput } from "./FormInput";

interface JSONSchemaFormProps {
  schema: JSONSchema7;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JSONSchemaFormState = any;

export class JSONSchemaFormComponent extends React.Component<JSONSchemaFormProps, JSONSchemaFormState> {
  constructor(props: JSONSchemaFormProps | Readonly<JSONSchemaFormProps>) {
    super(props);

    this.state = {
      defaultValues: this._getSchemaDefaultValues(props.schema),
    };
  }

  _getSchemaDefaultValues = (schema: JSONSchema7) => {
    // Validate and extract default values from the schema
    const ajv = new Ajv({ useDefaults: true });
    const validate = ajv.compile(schema);
    return validate({});
  };

  renderInputField = (fieldName, fieldType, isRequired) => {
    return (
      <chakra.div>
        <FormInput
          name={fieldName}
          label={`${String(fieldName).toUpperCase()}:`}
          placeholder={this.state.defaultValues[fieldName]}
          defaultValue={this.state.defaultValues[fieldName]}
        />
      </chakra.div>
    );
  };

  renderCheckboxField = (fieldName, enumValues) => {
    return (
      <div>
        <label>{fieldName}: </label>
        {enumValues.map((value, index) => {
          return (
            <chakra.div key={index}>
              <FormCheckbox
                label={`${String(fieldName).toUpperCase()}:`}
                value={value}
                name={fieldName}

                // isChecked={this.state.formData[fieldName] === value}
                // onChange={this.handleCheckboxChange}
              />
            </chakra.div>
          );
        })}
      </div>
    );
  };

  render() {
    const { schema } = this.props;

    return (
      <Stack>
        {Object.keys(schema.properties || {}).map((key, index) => {
          const property = schema.properties[key] as JSONSchema7;
          const isRequired = schema.required && schema.required.indexOf(key) !== -1;

          if (property.enum) {
            return this.renderCheckboxField(key, property.enum);
          } else {
            return this.renderInputField(key, property.type, isRequired);
          }
        })}
        <Button type="submit" rounded="3xl" fontSize="lg" fontWeight="medium">
          Submit
        </Button>
      </Stack>
    );
  }
}

// MyForm.propTypes = {
//   schema: PropTypes.object.isRequired,
//   defaultValues: PropTypes.object.isRequired,
// };

// export default MyForm;
