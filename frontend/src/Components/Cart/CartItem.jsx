import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../Context/CartProvider";
import { useNavigate } from "react-router-dom";

const CartItem = ({ cartItem }) => {
  const navigate = useNavigate();
  const { removeFromCart } = useContext(CartContext);

  const handleNameClick = () => {
    navigate(`/product/${cartItem._id}`);
  };

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <a href="#">
          <img src={cartItem.img[0]} alt="" />
        </a>
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem._id)}
        ></i>
      </td>

      <td style={{ cursor: "pointer" }} onClick={handleNameClick}>
        {cartItem.name}
      </td>

      <td>
        <td style={{ color: "red" }}>Color: {cartItem.color}</td>
        <br></br>
        <td style={{ color: "red" }}>Size: {cartItem.size}</td>
      </td>
      <td>${cartItem.price.toFixed(2)}</td>
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">
        ${(cartItem.price * cartItem.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
