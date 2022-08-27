import { Component } from "react";

class Table extends Component {
  render() {
    const { todos = [], onUpdateTodo, onDeleteTodo } = this.props;
    return (
      <table className='table table-striped table-hover'>
        <thead className='bg-dark text-light'>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, idx) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <button
                  className='btn btn-sm btn-info'
                  onClick={() => onUpdateTodo(item.id)}>
                  Update
                </button>
              </td>
              <td>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => onDeleteTodo(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
