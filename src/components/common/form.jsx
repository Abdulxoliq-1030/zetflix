import { Component } from "react";
import { toast } from "react-toastify";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  validate = () => {
    const errors = {};

    try {
      this.schema.validateSync(this.state.data, { abortEarly: false });
    } catch ({ inner }) {
      for (let { path, message } of inner) errors[path] = message;
      console.log("errors = ", errors);
    }

    return Object.values(errors).length ? errors : false;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    if (errors) {
      this.setState({ errors, disabled: false });
      return toast.error("Exist errors");
    }

    this.doSubmit();
  };

  validateField = (value, name) => {
    const errors = { ...this.state.errors };

    try {
      this.schema
        .pick([name])
        .validateSync({ [name]: value }, { abortEarly: false });
      delete errors[name];
    } catch ({ inner }) {
      for (let { path, message } of inner) errors[path] = message;
      console.log("errors = ", errors);
    }

    return Object.values(errors).length ? errors : false;
  };

  handleChange = (e) => {
    const { value, name } = e.target;

    const errors = this.validateField(value, name);

    const { data } = this.state;
    this.setState({ data: { ...data, [name]: value }, errors });
  };

  renderInput = (name, label, type = "text") => {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    return (
      <Select
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={this.state.errors[name]}
        name={name}
        label={label}
        options={options}
      />
    );
  };

  renderButton = (title) => {
    return <button className='btn btn-primary'>{title}</button>;
  };
}

export default Form;
