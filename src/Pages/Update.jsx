import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: { firstname: "", lastname: "" },
    username: "",
    email: "",
    phone: "",
    address: { street: "", city: "", zipcode: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedin, setisLoggedin] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/users/1")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name.includes(".") ? name.split(".")[0] : name]: name.includes(".")
        ? {
            ...prevUser[name.split(".")[0]],
            [name.split(".")[1]]: value,
          }
        : value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://fakestoreapi.com/users/1`, user)
      .then((response) => {
        alert("User updated successfully");
        setIsEditing(false);
        setUser(response.data); // Update user state with updated data from server
      })
      .catch((error) => {
        alert("Error updating user: " + error.message);
      });
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  return (
    <>
      <nav className="bg-gray-300 shadow-md ">
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

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-10">
        <div className="p-6">
          <div className="mt-2 text-center text-2xl ">
            <h2 className="block text-gray-700 font-bold mb-2"   >User Profile</h2>
          </div>

          <div className="text-center p-9 m-6 ">
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

          {isEditing ? (
            <form
              className="bg-white p-6  w-full max-w-4xl"
              onSubmit={handleSubmit}
              
            >
              <div className="mt-2 text-center text-2xl ">
                <h2 className="block text-gray-700 font-bold mb-2">
                  Fill your personal detail
                </h2>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  value={user.email}
                  name="email"
                  type="email"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username:
                </label>
                <input
                  value={user.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>

              <div className="flex flex-col gap-4 mb-4">
                <fieldset className="border border-gray-300 rounded-md p-4">
                  <legend className="text-gray-700 font-bold mb-4">Name</legend>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="firstname"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        First Name:
                      </label>
                      <input
                        name="name.firstname"
                        type="text"
                        value={user.name.firstname}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="lastname"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Last Name:
                      </label>
                      <input
                        name="name.lastname"
                        type="text"
                        value={user.name.lastname}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border border-gray-300 rounded-md p-4">
                  <legend className="text-gray-700 font-bold mb-4">
                    Address
                  </legend>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="city"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        City:
                      </label>
                      <input
                        name="address.city"
                        type="text"
                        value={user.address.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="street"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Street:
                      </label>
                      <input
                        name="address.street"
                        type="text"
                        value={user.address.street}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="zipcode"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Zipcode:
                      </label>
                      <input
                        name="address.zipcode"
                        type="text"
                        value={user.address.zipcode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone:
                </label>
                <input
                  name="phone"
                  type="text"
                  value={user.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>

              <button type="submit" className="w-[30%] p-2 bg-green-400 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 font-bold">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="max-w-2xl mx-auto bg-white  overflow-hidden mt-10">
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800">
                  Profile Information
                </h3>

                <div className="mt-2">
                  <p className="text-gray-600">
                    <strong>Full Name:</strong>
                    {`${user.name.firstname} ${user.name.lastname}`}
                  </p>
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

              <button
                onClick={() => setIsEditing(true)}
                className="w-[20%] p-2 bg-green-400 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 font-bold"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
