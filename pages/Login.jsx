import { Link } from "react-router";
import LoginForm from "../components/LoginForm";
import NavigationButton from "../components/UI/NavigationButton";
import { Helmet } from "react-helmet";

function Login() {
  return (
    <>
      <Helmet>
        <title>Login | Novus</title>
      </Helmet>
      <div className="h-screen flex flex-col items-center justify-center gap-6 max-w-[400px] w-full mx-auto p-4">
        <h1 className="text-4xl font-bold mb-10 tracking-widest">N O V U S</h1>
        <LoginForm />
        <Link to="*" className="text-[#ffff] text-sm font-medium opacity-50 ">
          Forgot password?
        </Link>
        <div className="flex items-center w-30 mx-auto gap-4 text-gray-500">
          <hr className="flex-grow border-[#787878]" />
          <span className="text-sm text-[#787878] ">or</span>
          <hr className="flex-grow border-[#787878]" />
        </div>
        <NavigationButton link="/signup">Create Account</NavigationButton>
      </div>
    </>
  );
}

export default Login;
