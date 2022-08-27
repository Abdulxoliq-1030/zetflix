import Form from "../components/common/form";
import * as yup from "yup";
import { register } from "../services";
import { toast } from "react-toastify";

class Register extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = yup.object({
    name: yup.string().required().label("Username"),
    email: yup.string().email().required().label("Email"),
    password: yup.string().min(6).required().label("Password"),
  });

  doSubmit = async () => {
    try {
      await register(this.state.data);
      toast.success("Success registered 👍🏻");
      this.props.history.replace("/login");
    } catch (err) {}
  };

  render() {
    return (
      <>
        <h1>Register Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Username")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </>
    );
  }
}

export default Register;
