import { Link } from "react-router-dom";
export default function ProductCard({product}) {
  return (
    <div className="product-card" >
      <img 
        src={product.image}
        className="product-card-image"
      />
      <div className="product-card-content">
        <h3 className="product-cart-name">{product.name}</h3>
        <p className="product-cart-price">{product.price}</p>
        <div className="product-cart-actions">
          <Link className="btn btn-secondary">View Details</Link>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
