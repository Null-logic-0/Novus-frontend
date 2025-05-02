// import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";

import NavigationButton from "../../components/UI/NavigationButton";
import LoginForm from "../../components/Authorization/LoginForm";

function Login() {
  return (
    <>
      <HeadProvider>
        <Title>Login | Novus</Title>
      </HeadProvider>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 max-w-[400px] w-full mx-auto p-4">
        <h1 className="text-4xl font-bold">N O V U S</h1>
        <LoginForm />
        {/* <Link
          to="/forgot-password"
          className="text-[#ffff] text-sm font-medium opacity-50 "
        >
          Forgot password?
        </Link> */}
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
