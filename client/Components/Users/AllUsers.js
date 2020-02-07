import React from "react";
import { connect } from "react-redux";
import { deleteUserAdminThenFetchAll } from "../../Redux/AllUsers/action/AllUsers.action";

class AllUsers extends React.Component {
  constructor() {
    super();
  }

  handleOnClickDelete = (e, id) => {
    e.preventDefault();
    this.props
      .deleteUser(id)
      .then(() => {
        console.log("Success");
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { user } = this.props;
    return (
      <div className="admin-user">
        <div className="row">
          <div className="col s12 m12 l4 left-align">
            <img className={"responsive-img"} src={user.imageUrl} />
          </div>
          <div className="col s12 m12 l8 left-align">
            <strong>Fullname</strong>
            {user.firstName} {user.lastName}
            <br />
            <strong>Email</strong>
            {user.email}
            <br />
            <strong>Id</strong>
            {`${user.id}`}
            <br />
            <strong>Admin</strong>
            {`${user.admin}`}
            <br />
            <br />
            <button className="edit">Edit</button>
            <br />
            <button
              className="delete"
              onClick={e => this.handleOnClickDelete(e, user.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: user => dispatch(deleteUserAdminThenFetchAll(user))
  };
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
