import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts.js";
import Card from "../Components/Card";
import "./home.css";

function Home() {
  const [productList] = useProducts();
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoggedin, setisLoggedin] = useState(false);
  const [cartCount, setCartCount] = useState(0); 


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedin(true);
    }
  }, []);

  // Filter products based on search input
  const filteredProducts = productList.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setInputValue(e.target.value);
  };

  
  const handleSearchClick = () => {
    setSearch(inputValue);
  };

  
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Function to handle adding a product to the cart
  const addToCart = () => {
    setCartCount(cartCount + 1); 
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-300 shadow-md fixed top-0 w-full z-10">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <a href="#" className="text-xl font-semibold text-gray-700">
              <img src="mylogo.png" className="logo" alt="menu" />
            </a>

            <div className="md:hidden">
              <button
                className="text-gray-700 focus:outline-none focus:text-gray-500"
                id="navbar-toggle"
              >
                <img src="menu-com.svg" alt="menu" />
              </button>
            </div>
          </div>

          
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            {/* Search bar */}
            <div className="relative">
              <input
                value={inputValue}
                onChange={handleSearchInputChange}
                type="text"
                className="w-full px-4 py-2 text-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search"
              />
              <button
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-600"
                onClick={handleSearchClick}
              >
                <img src="search-com.svg" alt="Search" />
              </button>
            </div>

            {/* Cart and profile buttons */}
            <div className="flex items-center space-x-4">
              {isLoggedin === false ? (
                <Link to="/login">
                  <button className="px-6 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700">
                    Login
                  </button>
                </Link>
              ) : (
                <>
              
                  <a href="#" className="text-gray-700 hover:text-blue-600 relative">
                    <img src="shopping-com.svg" alt="shopping" />
                    <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-600 rounded-full">
                      {cartCount} 
                    </span>
                  </a>

                
                  <div className="relative">
                    <Link to="/profile" className="hover:text-blue-500">
                      <button
                        id="profile-menu-button"
                        className="text-gray-800 hover:text-blue-500 focus:outline-none"
                      >
                        <img src="profilepic.svg" alt="Profile" />
                      </button>
                    </Link>
                  </div>

                  
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-100 mt-50 pt-[150px] ">
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </>
  );
}

export default Home;
