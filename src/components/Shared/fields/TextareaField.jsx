import React from "react";
import { Form } from "react-bootstrap";

const TextareaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  required,
  error,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {label} {required ? "*" : ""}
      </Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        isInvalid={!!error} // Show invalid state if there's an error
      />
      {/* Display error message */}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default TextareaField;
