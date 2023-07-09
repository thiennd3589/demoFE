import { Input } from "antd";

interface TextInputFieldProps {
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  placeholder?: string;
  label?: React.ReactNode | string;
  type?: string;
  name: string;
  field: any;
  form: any;
}

export default function TextInputField(props: TextInputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      {props.label ? (
        typeof props.label === "string" ? (
          <label className="mt-5 text-gray-500" htmlFor={props.name}>
            {props.label}
          </label>
        ) : (
          props.label
        )
      ) : undefined}
      <Input
        type={props.type}
        prefix={props.prefix}
        suffix={props.suffix}
        className="p-2 text-lg"
        placeholder={props.placeholder}
        name={props.name}
        id={props.name}
        {...props.field}
      />
    </div>
  );
}
