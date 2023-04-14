import { chakra, Button, Stack } from '@chakra-ui/react';
import Ajv from 'ajv';
import type { JSONSchema7 } from 'json-schema';
import React from 'react';
import FormCheckbox from './FormCheckbox';
import { FormInput } from './FormInput';

interface JSONSchemaFormProps {
  schema: JSONSchema7;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JSONSchemaFormState = any;

/**
 * @name JSONSchemaForm
 * @description A form component that renders a form based on a JSON schema
 * @param {JSONSchema7} schema - The JSON schema to render the form from (https://json-schema.org/)
 * @param {JSONSchemaFormState} state - The state of the form (default values, form data, etc.)
 * @param {JSONSchemaFormProps} props - The props of the form
 * @param {Function} renderInputField - A function that renders an input field (for string types)
 * @param {Function} renderCheckboxField - A function that renders a checkbox field (for enum types)
 * @param {Function} _getSchemaDefaultValues - A function that gets the default values from the schema using Ajv
 * @example
 * <JSONSchemaForm schema={schema} />
 */
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

  renderInputField = (fieldName: any, fieldType: any, isRequired: any) => {
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

  renderCheckboxField = (fieldName: any, enumValues: any) => {
    return (
      <div>
        <label>{fieldName}: </label>
        {enumValues.map((value: any, index: any) => {
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
          const property = schema.properties?.[key] as JSONSchema7;
          const isRequired = schema?.required && schema.required.indexOf(key) !== -1;

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
