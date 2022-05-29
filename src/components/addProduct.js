import React from "react";
import axios from "axios";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    /* These functions are for when the user inputs data*/
    this.skuInsert = this.skuInsert.bind(this);
    this.nameInsert = this.nameInsert.bind(this);
    this.priceInsert = this.priceInsert.bind(this);
    this.sizeInsert = this.sizeInsert.bind(this);
    this.heightInsert = this.heightInsert.bind(this);
    this.widthInsert = this.widthInsert.bind(this);
    this.lengthInsert = this.lengthInsert.bind(this);
    this.weightInsert = this.weightInsert.bind(this);

    //This function changes the form depending upon what is selected ,line 74
    this.typeChange = this.typeChange.bind(this);

    //this adds product to database ,line 118
    this.save = this.save.bind(this);
    //this returns user to main menu, line 113
    this.cancel = this.cancel.bind(this);

    this.state = {
      error: "",
      sku: "",
      name: "",
      price: "",
      type: "none",
      size: "",
      height: "",
      width: "",
      length: "",
      weight: "",
      products: [],
    };
  }

  skuInsert(event) {
    this.setState({ sku: event.target.value });
  }

  nameInsert(event) {
    this.setState({ name: event.target.value });
  }

  priceInsert(event) {
    this.setState({ price: event.target.value });
  }

  sizeInsert(event) {
    this.setState({ size: event.target.value });
  }

  heightInsert(event) {
    this.setState({ height: event.target.value });
  }

  widthInsert(event) {
    this.setState({ width: event.target.value });
  }

  lengthInsert(event) {
    this.setState({ length: event.target.value });
  }

  weightInsert(event) {
    this.setState({ weight: event.target.value });
  }

  //this function changes the form depending on what product the user wants to add

  typeChange(event) {
    this.setState({ type: event.target.value });

    let switchType = event.target.value;

    let DVDDiv = document.getElementById("DVD");
    let furnitureDiv = document.getElementById("Furniture");
    let bookDiv = document.getElementById("Book");

    //this hides a part of the form if the user has not selected a product type
    if (switchType === "none") {
      DVDDiv.style.display = "none";
      furnitureDiv.style.display = "none";
      bookDiv.style.display = "none";
    }

    //this shows the DVD form and hides the other product types , for when the user selects DVD
    else if (switchType === "DVD") {
      DVDDiv.style.display = "block";
      furnitureDiv.style.display = "none";
      bookDiv.style.display = "none";
    }

    //this shows the furniture form and hides the other product types , for when the user selects furniture
    else if (switchType === "furniture") {
      DVDDiv.style.display = "none";
      furnitureDiv.style.display = "block";
      bookDiv.style.display = "none";
    }

    //this shows the book form and hides the other product types , for when the user selects book
    else if (switchType === "book") {
      DVDDiv.style.display = "none";
      furnitureDiv.style.display = "none";
      bookDiv.style.display = "block";
    }
  }

  //this returns user to main menu
  cancel(e) {
    e.preventDefault();
    window.location.href = "/";
  }

  save(e) {
    e.preventDefault();

    //this sections checks if fields have input
    let switchType = this.state.type;

    if (this.state.sku === "") {
      this.setState({ error: "Please, submit required data " });
    } else if (this.state.name === "") {
      this.setState({ error: "Please, submit required data " });
    } else if (this.state.price === "" || this.state.price <= 0) {
      this.setState({ error: "Please, submit required data " });
    } else if (switchType === "none") {
      this.setState({ error: "Please, submit required data " });
    }
    //provided that the user has given input this code follows
    else {
      let productList = this.state.products;

      let x = 1;
      // this code makes sure that the sku is unique
      for (var i = 0; i < productList.length; i++) {
        if (productList[i].sku === this.state.sku) {
          x = 0;
        }
      }
      //this checks if Sku has already been used and stops the post if it has
      if (x === 0) {
        this.setState({ error: "SKU already in use " });
      } else {
        //this posts DVD information to the database
        if (switchType === "DVD") {
          if (this.state.size > 0) {
            let attributes = "Size: ".concat(this.state.size, " MB");
            const fd = new FormData();
            fd.append("sku", this.state.sku);
            fd.append("name", this.state.name);
            fd.append("price", this.state.price);
            fd.append("type", this.state.type);
            fd.append("attributes", attributes);

            axios.post("https://airbhudda.com/", fd).then(function (response) {
              console.log(response.data);
            });
          } else {
            this.setState({ error: "Please, submit required data " });
          }
        }

        //this posts furniture info to the database
        else if (switchType === "furniture") {
          if (
            this.state.height > 0 &&
            this.state.width > 0 &&
            this.state.length > 0
          ) {
            let attributes = this.state.height.concat(
              "x",
              this.state.width,
              "x",
              this.state.length
            );
            attributes = "Dimension: ".concat(attributes);
            const fd = new FormData();
            fd.append("sku", this.state.sku);
            fd.append("name", this.state.name);
            fd.append("price", this.state.price);
            fd.append("type", this.state.type);
            fd.append("attributes", attributes);

            axios.post("https://airbhudda.com/", fd).then(function (response) {
              console.log(response.data);
            });
          } else {
            this.setState({ error: "Please, submit required data " });
          }
        }

        //this posts book information to the databse
        else if (switchType === "book") {
          if (this.state.weight > 0) {
            let attributes = "Weight: ".concat(this.state.weight, "KG");
            const fd = new FormData();
            fd.append("sku", this.state.sku);
            fd.append("name", this.state.name);
            fd.append("price", this.state.price);
            fd.append("type", this.state.type);
            fd.append("attributes", attributes);

            axios.post("https://airbhudda.com/", fd).then(function (response) {
              console.log(response.data);
            });
          } else {
            this.setState({ error: "Please, submit required data " });
          }
        }

        //this sends user back to main page after posting to database

        window.location.href = "/";
      }
    }
  }
  componentDidMount() {
    //this code gets product info from the database so that I can use the data to make sure that the user inputs a unique sku
    axios.get("http://airbhudda.com/").then((res) => {
      //Storing users detail in state array object
      this.setState({ products: res.data });
    });

    // this hides the product type section of the form so that the user has to select the type of product they want to add
    let switchType = this.state.type;

    let DVDDiv = document.getElementById("DVD");
    let furnitureDiv = document.getElementById("Furniture");
    let bookDiv = document.getElementById("Book");

    //this hides a part of the form if the user has not selected a product type
    if (switchType === "none") {
      DVDDiv.style.display = "none";
      furnitureDiv.style.display = "none";
      bookDiv.style.display = "none";
    }

    //this shows the DVD form and hides the other product types , for when the user selects DVD
    else if (switchType === "DVD") {
      DVDDiv.style.display = "block";
      furnitureDiv.style.display = "none";
      bookDiv.style.display = "none";
    }

    //this shows the furniture form and hides the other product types , for when the user selects furniture
    else if (switchType === "furniture") {
      DVDDiv.style.display = "none";
      furnitureDiv.style.display = "block";
      bookDiv.style.display = "none";
    }

    //this shows the book form and hides the other product types , for when the user selects book
    else if (switchType === "book") {
      DVDDiv.style.display = "none";
      furnitureDiv.style.display = "none";
      bookDiv.style.display = "block";
    }
  }

  render() {
    return (
      <div className="main">
        <title>Product Add</title>
        <div class="header">
          <div class="">
            <h1>Product</h1>
          </div>

          <div class="buttons">
            <button onClick={this.save}> Save </button>
            <button onClick={this.cancel}> cancel </button>
          </div>
        </div>

        <h3 id="error">{this.state.error}</h3>

        <form id="product_form">
          <label>
            SKU
            <input
              type="text"
              id="sku"
              value={this.state.sku}
              onChange={this.skuInsert}
            />
          </label>

          <label>
            Name
            <input
              type="text"
              id="name"
              value={this.state.name}
              onChange={this.nameInsert}
            />
          </label>

          <label>
            price($)
            <input
              type="number"
              id="price"
              value={this.state.price}
              onChange={this.priceInsert}
            />
          </label>

          <label>
            Type Switcher
            <select id="productType" name="type" onChange={this.typeChange}>
              <option value="none"> Type Switcher </option>
              <option value="DVD"> Dvd </option>
              <option value="furniture"> Furniture </option>
              <option value="book"> Book</option>
            </select>
          </label>

          <div class="product" id="DVD">
            <label>
              Size(MB)
              <input
                type="number"
                id="size"
                value={this.state.size}
                onChange={this.sizeInsert}
              />
            </label>

            <p>
              "Please provide dimensions in MB format When type DVD is
              selected."
            </p>
          </div>

          <div class="product" id="Furniture">
            <label>
              Height(CM)
              <input
                type="number"
                id="height"
                value={this.state.height}
                onChange={this.heightInsert}
              />
            </label>

            <br />
            <label>
              Width(CM)
              <input
                type="number"
                id="width"
                value={this.state.width}
                onChange={this.widthInsert}
              />
            </label>

            <br />

            <label>
              Length(CM)
              <input
                type="number"
                id="length"
                value={this.state.length}
                onChange={this.lengthInsert}
              />
            </label>

            <p>
              "Please provide dimensions in HxWxL format When type furniture is
              selected."
            </p>
          </div>

          <div class="product" id="Book">
            <label>
              Weight(KG)
              <input
                type="number"
                id="weight"
                value={this.state.weight}
                onChange={this.weightInsert}
              />
            </label>

            <p>
              "Please provide dimensions in KG format When type Book is
              selected."
            </p>
          </div>
        </form>

        <div class="bottom">
          <p>Scandiweb Test assignment</p>
        </div>
      </div>
    );
  }
}

export default AddProduct;
