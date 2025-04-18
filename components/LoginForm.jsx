import Button from "./UI/Button";
import FormUI from "./UI/FormUI";
import Input from "./UI/Input";

function LoginForm() {
  return (
    <FormUI>
      <Input type="email" name="email" placeholder="E-mail" />
      <Input type="password" name="password" placeholder="Password" />
      <Button className="bg-[#ffffff]">Log in</Button>
    </FormUI>
  );
}

export default LoginForm;
