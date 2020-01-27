import React from "react";
//React-Redux
import { connect } from "react-redux";
//actions

import {
  fetchCartStartAsync,
  addToCartStartAsync,
  incrementItemStartAsync,
  decrementItemStartAsync
} from "../../Redux/Cart/actions/cart.actions";
import {
  addUser,
  removeUser,
  verifyUserCookie
} from "../../Redux/User/actions/user.actions";
import {
  itemsFetchStartAsync,
  createItemThenFetch,
  updateItemThenFetch,
  deleteItemThenFetch

} from "../../Redux/Items/actions/items.actions";
import LogIn from "../LogIn";
import axios from "axios";

export class ReduxTestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createItem: {
        name: "",
        price: 0,
        size: "",
        description: ""
      },
      updateItem: {
        id: 0,
        name: "",
        price: 0,
        size: "",
        description: ""
      },
      deleteItem: "",

      user: {
        email: "",
        password: ""
      },
      loggedIn: false,
      name: ""
    };
  }

  currentCartId = "3ece4185-01ba-4cad-ae91-2843e5f0c623";

  componentDidMount() {
    this.props.allItemsFetchStartAsync();
    this.props.fetchCartStartAsync(this.currentCartId);
    this.props.persistUser();
  }

  addUserFunction = e => {
    e.preventDefault();
    this.props.addUser({ name: "Test User" });
  };

  removeUserFunction = e => {
    e.preventDefault();
    this.props.removeUser();
  };

  onCreateItemChange = e => {
    this.setState({
      createItem: { ...this.state.createItem, [e.target.name]: e.target.value }
    });
  };

  onCreateSubmit = e => {
    e.preventDefault();
    this.props.createItemThenFetchAll(this.state.createItem);
  };

  onSelectUpdateItemChange = e => {
    this.setState({
      updateItem: { ...this.state.updateItem, [e.target.name]: e.target.value }
    });
  };

  onUpdateItemChange = e => {
    this.setState({
      updateItem: { ...this.state.updateItem, [e.target.name]: e.target.value }
    });
  };

  onUpdateSubmit = e => {
    e.preventDefault();
    this.props.updateItemThenFetchAll(this.state.updateItem);
  };

  onDeleteChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDeleteSubmit = e => {
    e.preventDefault();
    this.props.deleteItemThenFetchAll(this.state.deleteItem);
    console.log(this.state.deleteItem);
  };

  addItemFunction = (e, id) => {
    e.preventDefault();
    this.props.addToCartStartAsync(id, this.currentCartId);
  };

  incrementItemFunction = (e, id) => {
    console.log(id);
    e.preventDefault();
    this.props.incrementItemStartAsync(id, this.currentCartId);
  };

  decrementItemFunction = (e, id) => {
    e.preventDefault();
    this.props.decrementItemStartAsync(id, this.currentCartId);
  };

  handleLogIn = e => {
    e.preventDefault();
    axios
      .post("/login", this.state.user)
      .then(() => {
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loggedIn: false });
      });
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => {
      let user = { ...prevState.user };
      user[name] = value;
      return { user };
    });
  };

  render() {
    // let totalCost = this.props.cart.reduce(
    //   (acc, { quantity, price }) => (acc += quantity * price),
    //   0
    // );
    return (
      <div className='container'>
        THIS IS A REDUX TEST COMPONENT
        {this.state.loggedIn && <p>Hello there {this.state.name}</p>}
        <div>
          TODO:
          <br />
          create user -
          <br />
          update user -
        </div>
        <div>
          add/remove user
          <button onClick={e => this.addUserFunction(e)}>add user</button>
          <button onClick={e => this.removeUserFunction(e)}>remove user</button>
        </div>
        ***** UPDATE ITEM *****
        <div>
          <form onSubmit={this.onUpdateSubmit}>
            <label>select id</label>
            <select name='id' onChange={this.onSelectUpdateItemChange}>
              <option value={0}>nothing</option>
              {this.props.inventory.map(({ id, name }) => {
                return <option value={id}>{name}</option>;
              })}
            </select>
            <label>name</label>
            <input
              onChange={this.onUpdateItemChange}
              type='text'
              name='name'
              value={this.state.updateItem.value}
              placeholder='enter name here'
            ></input>
            <label>price</label>
            <input
              onChange={this.onUpdateItemChange}
              type='number'
              name='price'
              value={this.state.updateItem.value}
              placeholder='enter price here'
            ></input>
            <label>size</label>
            <select name='size' onChange={this.onUpdateItemChange}>
              <option value='medium'>small</option>
              <option value='medium'>medium</option>
              <option value='medium'>large</option>
            </select>
            <label>description</label>
            <input
              onChange={this.onUpdateItemChange}
              type='text'
              name='description'
              value={this.state.updateItem.value}
              placeholder='enter description here'
            ></input>
            <input type='submit' value='Update' />
          </form>
        </div>
        ***** CREATE ITEM *****
        <div>
          <form onSubmit={this.onCreateSubmit}>
            <label>name</label>
            <input
              onChange={this.onCreateItemChange}
              type='text'
              name='name'
              value={this.state.createItem.value}
              placeholder='enter name here'
            ></input>
            <label>price</label>
            <input
              onChange={this.onCreateItemChange}
              type='number'
              name='price'
              value={this.state.createItem.value}
              placeholder='enter price here'
            ></input>
            <label>size</label>
            <select name='size' onChange={this.onCreateItemChange}>
              <option value='medium'>small</option>
              <option value='medium'>medium</option>
              <option value='medium'>large</option>
            </select>
            <label>description</label>
            <input
              onChange={this.onCreateItemChange}
              type='text'
              name='description'
              value={this.state.createItem.value}
              placeholder='enter description here'
            ></input>
            <input type='submit' value='Submit' />
          </form>
        </div>
        ***** DELETE ITEM *****
        <div>
          <form onSubmit={this.onDeleteSubmit}>
            <label>items</label>
            <select name='deleteItem' onChange={this.onDeleteChange}>
              <option value={0}>nothing</option>
              {this.props.inventory.map(({ id, name }) => {
                return <option value={id}>{name}</option>;
              })}
            </select>
            <input type='submit' value='Delete' />
          </form>
        </div>
        ***** INVENTORY *****
        <div>
          {this.props.inventory.map(({ id, name, price }) => {
            return (
              <div>
                NAME: {name}
                PRICE: {price}
                <button onClick={e => this.addItemFunction(e, id, name, price)}>
                  ADD TO CART
                </button>
              </div>
            );
          })}
        </div>
        <div>
          ***** TEST CART *****
          {this.props.cart.map(({ id, quantity, item: { name, price } }) => {
            return (
              <div>
                <span>{`NAME: ${name} `}</span>
                <span>{`PRICE: $ ${price} `}</span>
                <span>{`COUNT: ${quantity} `}</span>
                <button onClick={e => this.incrementItemFunction(e, id)}>
                  +
                </button>
                <button onClick={e => this.decrementItemFunction(e, id)}>
                  -
                </button>
              </div>
            );
          })}
        </div>
        TOTAL COST:
        {/* LogIn Component */}
        <LogIn />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user)),
  removeUser: () => dispatch(removeUser()),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
  itemsFetchStartAsync: () => dispatch(itemsFetchStartAsync()),
  createItemThenFetch: item => dispatch(createItemThenFetch(item)),
  updateItemThenFetch: item => dispatch(updateItemThenFetch(item)),
  deleteItemThenFetch: id => dispatch(deleteItemThenFetch(id)),

  persistUser: () => dispatch(verifyUserCookie())
});

const mapStateToProps = state => ({
  cart: state.cart.cartContent.CartItem,
  user: state.user,
  inventory: state.inventory.items
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestComponent);