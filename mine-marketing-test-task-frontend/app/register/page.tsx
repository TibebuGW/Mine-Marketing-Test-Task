export const Signup = () => {
  return (
    <div className="font-primaryFont font-bold bg-gradient-to-r from-blue-purple-0 to-blue-purple-100 h-screen flex items-center justify-center">
      <div className="w-30p">
        <form className="py-3 px-10 overflow-y-auto rounded-2xl shadow-md box-border bg-[#d6dce9]">
          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="my-2">
              <label className="block my-2 text-black">First Name</label>
              <input
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
                placeholder="First name"
                type="text"
              />
            </div>
            <div className="my-2">
              <label className="block my-2 text-black">Second Name</label>
              <input
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
                placeholder="Second name"
                type="text"
              />
            </div>
          </div>
          <div className="my-2">
            <label className="block my-2 text-black">Email</label>
            <input
              className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="my-2">
            <label className="block my-2 text-black">Password</label>
            <input
              className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="my-2">
            <label className="block my-2 text-black">Confirm Password</label>
            <input
              className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
              placeholder="Confirm password"
              type="password"
            />
          </div>
          <button className="py-2 px-5 my-3 text-secondary rounded-md w-full bg-lightPrimary hover:bg-darkPrimary">
            Sign up
          </button>
          <p className="my-3 text-center text-black">
            Already have an account? <span className="text-blue">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
