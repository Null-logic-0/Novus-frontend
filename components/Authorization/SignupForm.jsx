import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { queryClient, signup } from "../../util/http.js";
import { setAuth } from "../../store/authSlice.jsx";

import Button from "../UI/Button";
import FormUI from "../UI/FormUI";
import Input from "../UI/Input";
import ErrorBlock from "../UI/ErrorBlock.jsx";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      dispatch(setAuth({ token: data.token }));
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      navigate("/");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    mutate(data);
  }

  return (
    <FormUI onSubmit={handleSubmit}>
      <Input
        type="text"
        name="fullName"
        placeholder="Full name"
        defaultValue={data?.fullName ?? ""}
      />
      <Input
        type="email"
        name="email"
        placeholder="E-mail"
        defaultValue={data?.email ?? ""}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={data?.password ?? ""}
      />
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm password"
        defaultValue={data?.passwordConfirm ?? ""}
      />
      <Button className="bg-[#ffffff]" disabled={isPending}>
        {isPending ? "Signing up..." : "Sign up"}
      </Button>
      {isError && (
        <ErrorBlock
          title="Failed to create account!"
          message={error.info?.message || "Invalid data provided"}
        />
      )}
    </FormUI>
  );
}

export default SignupForm;
