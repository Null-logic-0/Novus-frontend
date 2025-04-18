import Button from "./UI/Button";
import FormUI from "./UI/FormUI";
import Input from "./UI/Input";

function SignupForm() {
  return (
    <FormUI>
      <Input type="text" name="fullName" placeholder="Full name" />
      <Input type="email" name="email" placeholder="E-mail" />
      <Input type="password" name="password" placeholder="Password" />
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm password"
      />
      <Button className="bg-[#ffffff]">Sign up</Button>
    </FormUI>
  );
}

export default SignupForm;
