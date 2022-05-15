import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 10, textAlign: 'center', background: 'transparent', margin:'12px auto', color:'red', borderRadius: '12px', fontWeight:'lighter'}}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
