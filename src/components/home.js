
import React from "react";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    /* These functions are for when the user inputs data*/

    //this function is responsible for the mass delete line 47
    this.delProducts = this.delProducts.bind(this);

    //this function sends user to the product add page line 42
    this.add = this.add.bind(this);

    //this functions makes an array of the items the user has selected to mass delete line 27
    this.handleCheck = this.handleCheck.bind(this);

    this.state = {
      count: 0,
      products: [],
      productsDelete: [],
    };
  }

  //this functions makes an array of the items the user has selected to mass delete
  handleCheck(event) {
    let delItems = this.state.productsDelete;
    let newItem = event.target.value;

    if (event.target.checked) {
      delItems.push(newItem);
      this.setState({ productsDelete: delItems });
    } else {
      //checkbox not checked
      delItems.splice(delItems.indexOf(newItem), 1);
      this.setState({ productsDelete: delItems });
    }
  }

  //this function goes to the product add section
  add(event) {
    window.location.href = "/add-product";
  }

  //this deletes the products selected and then reloads the page
  delProducts(event) {
    event.preventDefault();

    let delItems = this.state.productsDelete;

    for (var i = 0; i < delItems.length; i++) {
      const fd = new FormData();
      fd.append("deleteid", delItems[i]);

      axios.post("https://airbhudda.com/", fd).then(function (response) {
        console.log(response.data);
      });
    }

    window.location.reload();
  }

  //this gets product data

  componentDidMount() {
    axios.get("https://airbhudda.com/").then((res) => {
      //Storing users detail in state array object
      this.setState({ products: res.data });
    });
  }

  render() {
    return (
      <div className="main">
        <title>Home</title>
        <div className="header">
          <h1>List Products</h1>

          <div className="buttons">
            <button onClick={this.add}>ADD </button>

            <button onClick={this.delProducts} id="delete-product-btn">
              MASS DELETE{" "}
            </button>
          </div>
        </div>

        <div className="products">
          {this.state.products.map((product) => (
            <div>
              <input
                type="checkbox"
                value={product.id}
                onChange={this.handleCheck}
                className="delete-checkbox"
              />
              <p>{product.sku} </p>
              <p>{product.name}</p>
              <p> {product.price} $</p>
              <p>{product.attributes}</p>
            </div>
          ))}
        </div>
        <div class="bottom">
          <p>Scandiweb Test assignment</p>
        </div>
      </div>
    );
  }
}

export default Home;
