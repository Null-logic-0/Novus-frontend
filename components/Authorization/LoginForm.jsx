import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice.jsx";
import { login, queryClient } from "../../util/http";

import Button from "../UI/Button";
import FormUI from "../UI/FormUI";
import Input from "../UI/Input";
import ErrorBlock from "../UI/ErrorBlock";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setAuth({ token: data.token }));
      queryClient.invalidateQueries({ queryKey: ["login"] });
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
      <Button className="bg-[#ffffff]" disabled={isPending}>
        {isPending ? "logging in..." : "Log in"}
      </Button>
      {isError && (
        <>
          <ErrorBlock
            title="Failed to log in account!"
            message={error.info?.message || "Invalid data provided"}
          />
        </>
      )}
    </FormUI>
  );
}

export default LoginForm;
