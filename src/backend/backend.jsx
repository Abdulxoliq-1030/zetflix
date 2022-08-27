import { Component } from "react";
import { Loader } from "../components";
import Table from "./components/table";
import axios from "axios";
import { toast } from "react-toastify";

const endPoint = "https://jsonplaceholder.typicode.com/posts";
class Backend extends Component {
  state = {
    todos: [],
    loading: true,
    submitting: false,
  };

  handleCreateTodo = async () => {
    this.setState({ submitting: true });

    const todo = {
      title: "My todo",
      body: "My todo Body",
    };

    const newTodo = (await axios.post(endPoint, todo)).data;
    toast.success(`success added todo = ${newTodo.id}`);
    this.setState({ todos: [newTodo, ...this.state.todos], submitting: false });
  };

  handleUpdateTodo = async (todoID) => {
    this.setState({ submitting: true });
    const todos = [...this.state.todos];
    const idx = todos.findIndex(({ id }) => id === todoID);
    const todo = todos[idx];
    todo.title = "My Update Todo";

    await axios
      .put(endPoint + `/${todoID}`, todo)
      .catch(() => this.setState({ submitting: false }));
    toast.success(`success update todo = ${todoID}`);
    this.setState({ todos, submitting: false });
  };

  handleDeleteTodo = async (todoID) => {
    const originalTodos = [...this.state.todos];
    const todos = this.state.todos.filter(({ id }) => id !== todoID);
    this.setState({ todos });
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posssts/32868362`);
      toast.success(`success delete todo = ${todoID}`);
      this.setState({ submitting: false });
    } catch (err) {
      toast.warning(`not found todo ${todoID}`);
      this.setState({ todos: originalTodos, submitting: false });
    }
  };

  async componentDidMount() {
    const todos = (await axios(endPoint)).data;
    this.setState({ loading: false, todos });
  }

  render() {
    if (this.state.loading) return <Loader />;

    return (
      <>
        {this.state.submitting && <Loader full />}
        <div className='container'>
          <button
            className='btn btn-primary btn-sm'
            onClick={this.handleCreateTodo}>
            Create Todo
          </button>
          <h1 className='text-center'>Todos Table</h1>
          <Table
            onUpdateTodo={this.handleUpdateTodo}
            onDeleteTodo={this.handleDeleteTodo}
            todos={this.state.todos}
          />
        </div>
      </>
    );
  }
}

export default Backend;
