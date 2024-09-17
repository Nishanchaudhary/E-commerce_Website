import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../apiLayer";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    addUser(data).then(() => {
      alert("FakeStoreApi doesnot allow to add user!!!");
      localStorage.setItem("token", true);
      navigate("/");
    });
  };
  console.log(watch());
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300 m-4  ">
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-2 text-center text-2xl ">
          <h2 className="block text-gray-700 font-bold mb-2">
            Fill your personal detail
          </h2>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...register("email")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
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
            id="username"
            name="username"
            type="text"
            {...register("username")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            {...register("password")}
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
                  id="firstname"
                  name="name.firstname"
                  type="text"
                  {...register("name.firstname")}
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
                  id="lastname"
                  name="name.lastname"
                  type="text"
                  {...register("name.lastname")}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-gray-700 font-bold mb-4">Address</legend>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-bold mb-2"
                >
                  City:
                </label>
                <input
                  id="city"
                  name="address.city"
                  type="text"
                  {...register("address.city")}
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
                  id="street"
                  name="address.street"
                  type="text"
                  {...register("address.street")}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="number"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Number:
                </label>
                <input
                  id="number"
                  name="address.number"
                  type="number"
                  {...register("address.number")}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="zipcode"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Zip Code:
                </label>
                <input
                  id="zipcode"
                  name="address.zipcode"
                  type="text"
                  {...register("address.zipcode")}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lat"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Latitude:
                </label>
                <input
                  id="lat"
                  name="address.geolocation.lat"
                  type="text"
                  {...register("address.geolocation.lat")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="long"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Longitude:
                </label>
                <input
                  id="long"
                  name="address.geolocation.long"
                  type="text"
                  {...register("address.geolocation.long")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
                />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone:
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            {...register("phone")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e5e7eb]"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-[20%] p-2 bg-sky-400 text-white rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-700 font-bold"
          >
            Sign Up
          </button>
        </div>
        <div className="mt-2 text-center">
          <span>
            Already a member?{" "}
            <Link to="/login" className="hover:text-blue-500">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
