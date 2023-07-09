import { ErrorMessage as FormikErrorMessage } from "formik";

interface ErrorMessageProps {
  name: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <span className="text-red-500">
      <FormikErrorMessage name={props.name} />
    </span>
  );
};

export default ErrorMessage;
