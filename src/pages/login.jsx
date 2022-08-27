import Form from "../components/common/form";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { login } from "../services";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = object({
    email: string().email().required().label("Email"),
    password: string().min(6).required().label("Password"),
  });

  doSubmit = async () => {
    try {
      const { data: jwt } = await login(this.state.data);
      localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, jwt);

      toast.success(`Success logged in`);
      this.props.onLogin();
    } catch (err) {}
  };

  render() {
    return (
      <>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </>
    );
  }
}

export default Login;
