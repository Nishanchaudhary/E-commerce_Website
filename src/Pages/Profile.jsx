import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedin, setisLoggedin] = useState(false);

  useEffect(() => {
    // Fetch user information from the API
    axios
      .get("https://fakestoreapi.com/users/1") // You can change the user ID (1) based on your need
      .then((response) => {
        setUser(response.data); // Update user state with the data from API
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error); // Capture any error that occurs
        setLoading(false);
      });
    // login token........
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  return (
    <>
      <nav className="bg-gray-300 shadow-md fixed top-0 w-full z-10">
        <div className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Link to="/">
              <a href="#" className="text-xl font-semibold text-gray-700">
                <img src="mylogo.png" className="logo" alt="menu" />
              </a>
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-700 focus:outline-none focus:text-gray-500"
                id="navbar-toggle"
              >
                <img src="menu-com.svg" alt="menu" />
              </button>
            </div>
          </div>

          {/* search bar */}
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <div className="relative">
              <Link to="/">
                <input
                  type="text"
                  className="w-full px-4 py-2 text-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Search"
                />
                <button className="absolute right-0 top-0 mt-2 mr-3 text-gray-600">
                  <img src="search-com.svg" alt="Search" />
                </button>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedin === false ? (
                <Link to="/login">
                  <button className="px-6 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700">
                    Login
                  </button>
                </Link>
              ) : (
                <>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 relative"
                  >
                    <img src="shopping-com.svg" alt="shopping" />
                    <span className="absolute top-0 right-0 px-1 text-xs text-white bg-red-600 rounded-full">
                      0
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

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-[140px]">
        <div className="p-[30px]">
          <div className="text-center p-11 ">
            <img
              className="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-blue-500 shadow-md"
              src="profile.jpg"
              alt="Profile Picture"
            />
            <h2 className="text-2xl font-semibold mt-4">
              {" "}
              {`${user.name.firstname} ${user.name.lastname}`}
            </h2>
            <p className="text-gray-500">Username: {user.username}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800">
              Profile Information
            </h3>

            <div className="mt-2">
              <p className="text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600">
                <strong>Username:</strong>
                {user.username}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800">Address</h3>

            <div className="mt-2">
              <p className="text-gray-600">
                <strong>City:</strong> {user.address.city}
              </p>
              <p className="text-gray-600">
                <strong>Street:</strong> {user.address.street}
              </p>
              <p className="text-gray-600">
                <strong>Zipcode:</strong> {user.address.zipcode}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800">
              Contact Information
            </h3>

            <div className="mt-2">
              <p className="text-gray-600">
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>

          
          <Link to={"/update"}>
            <button className="bg-sky-400 hover:bg-sky-600 text-white py-2 px-4 rounded-lg shadow">
              Update
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;
