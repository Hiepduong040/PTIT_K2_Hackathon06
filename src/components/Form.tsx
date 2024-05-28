import ListCart from "./ListCart";
import ListProduct from "./ListProduct";

export default function Form() {
  return (
    <>
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
        </div>

        <div className="row">
          <div>
             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h1 className="panel-title">List Products</h1>
                </div>
                  <ListProduct handleAddToCart={
                    function (product: any, quantity: number, index: number): void {
                    throw new Error("Function not implemented.");
                  } } 
                ></ListProduct>
              </div>
            </div> 
          
          </div>
          <div>
             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="panel panel-danger">
                <div className="panel-heading">
                  <h1 className="panel-title">Your Cart</h1>
                </div>
                <ListCart></ListCart>
              </div>
              <div className="alert alert-success" role="alert" id="mnotification">
                Add to cart successfully
              </div>
            </div> 
            
          </div>
        </div>
      </div>
</>
  )
}
