import SignupForm from "../components/SignupForm";
import Button from "../components/UI/Button";
import NavigationButton from "../components/UI/NavigationButton";

function Signup() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 max-w-[400px] w-full mx-auto p-4">
      <h1 className="text-4xl font-bold mb-10 tracking-widest">N O V U S</h1>

      <SignupForm />

      <span className="text-sm text-[#787878] ">Do you have an account?</span>

      <NavigationButton link="/login">
        Log in with existing account.
      </NavigationButton>
    </div>
  );
}

export default Signup;
