import { FaTag, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

function Card({ product, addToCart }) {
  return (
    <div className="max-w-sm rounded-[20px] py-5 overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        className="w-full h-48 object-contain"
        src={product.image}
        alt={product.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-l mb-2 text-center">{product.title}</div>
        <p className="text-center text-green-500">${product.price}</p>

        <div className="flex justify-center m-5">
          <button
            onClick={() => {
              addToCart(); // Call the addToCart function when the button is clicked
              toast.success(`1 ${product.title} added to the cart`);
            }}
            className="px-6 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700 transition-colors duration-300"
          >
            Add To Cart
          </button>
        </div>

        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center text-gray-600">
            <FaTag className="mr-2" />
            <span>{product.category}</span>
          </div>
          <div className="flex items-center text-[#f5f556]">
            <FaStar className="mr-2" />
            <span>{product.rating.rate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
