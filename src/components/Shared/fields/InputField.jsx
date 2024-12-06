import React from "react";
import { Form } from "react-bootstrap";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  min,
  error,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>
        {label} {required ? "*" : ""}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        isInvalid={!!error} // Show invalid state if there's an error
      />
      {/* Display error message */}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputField;
