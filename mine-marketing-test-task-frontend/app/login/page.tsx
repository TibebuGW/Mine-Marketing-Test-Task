export const Login = () => {
    return (
      <div className="font-primaryFont font-bold bg-gradient-to-r from-blue-purple-0 to-blue-purple-100 h-screen flex items-center justify-center">
        <div className="w-30p">
          <form className="py-3 px-10 overflow-y-auto rounded-2xl shadow-md box-border bg-[#d6dce9] ">
            <div className="my-5">
              <label className="block my-2 text-black">Email</label>
              <input
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="my-5">
              <label className="block my-2 text-black">Password</label>
              <input
                className="box-border shadow py-2 px-5 rounded-md w-full placeholder:font-medium"
                placeholder="Password"
                type="Password"
              />
            </div>
            <p className="mt-3 text-blue">Forgot Password?</p>
            <button className="py-2 px-5 my-3 text-secondary rounded-md w-full bg-lightPrimary hover:bg-darkPrimary">
              Login
            </button>
            <p className="mt-3 text-center text-black">
              Don&apos;t have an account? <span className="text-blue">Sign Up</span>
            </p>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  