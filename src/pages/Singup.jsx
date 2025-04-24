import { HeadProvider, Title } from "react-head";

import NavigationButton from "../../components/UI/NavigationButton";
import SignupForm from "../../components/Authorization/SignupForm";

function Signup() {
  return (
    <>
      <HeadProvider>
        <Title>Create new account | Novus</Title>
      </HeadProvider>
      <div className="min-h-screen flex flex-col items-center justify-center gap-8 max-w-[400px] w-full mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold">N O V U S</h1>

        <SignupForm />

        <span className="text-sm text-[#787878] ">Do you have an account?</span>

        <NavigationButton link="/login">
          Log in with existing account.
        </NavigationButton>
      </div>
    </>
  );
}

export default Signup;
