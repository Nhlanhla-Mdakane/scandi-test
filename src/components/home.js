import React from 'react';
import axios from "axios";


class Home extends React.Component {


  constructor(props) {
    super(props);
/* These functions are for when the user inputs data*/
  this.delProducts= this.delProducts.bind(this);
    this.add= this.add.bind(this);

    this.handleCheck= this.handleCheck.bind(this);

   this.state = {

       count:0,
       products:[],
       productsDelete:[]





   };

  }




  handleCheck(event){

    let delItems=this.state.productsDelete;
    let newItem=event.target.value;

    if (event.target.checked) {

         delItems.push(newItem)
         this.setState({ productsDelete: delItems});


   } else {
     //checkbox not checked
     delItems.splice(delItems.indexOf(newItem), 1);
     this.setState({ productsDelete: delItems});



   }




  }



  add(event){

    window.location.href = "/add";


  }


  delProducts(event){
    event.preventDefault();

    let delItems=this.state.productsDelete;


    for (var i=0; i < delItems.length; i++) {


          const fd = new FormData();
                fd.append('deleteid', delItems[i]);



                 axios.post('http://localhost/react/scandi/api/', fd ).then(function(response){
                     console.log(response.data);

                 });
    }

 window.location.reload();

  }




  componentDidMount(){

    axios.get('http://localhost/react/scandi/api/index.php').then(res =>
      {
      //Storing users detail in state array object
     this.setState({ products: res.data});
         });


}


    render(){

      return (

          <div className="main">
              <title>Home</title>
            <div className="header">
              <h1>List Products</h1>

            <div className="buttons">

              <button
              onClick={this.add}
              >Add </button>

              <button
              onClick={this.delProducts}
              >Mass Delete </button>
            </div>

            </div>

                     <div className="products">
                      {this.state.products.map((product) =>

                      <div>

                            <input
                     type="checkbox"
                     value={product.id}

                     className="checkBox"
                     onChange={this.handleCheck}
                   />
                              <p>{product.sku} </p>
                                  <p>{product.name}</p>
                                <p> {product.price} $</p>
                                        <p>{product.attributes}</p>






                          </div>
                      )}
                      </div>
                      <div class="bottom">
                        <p>Scandiweb Test assignment</p>
                      </div>


          </div>


      )}
}


export default Home;
