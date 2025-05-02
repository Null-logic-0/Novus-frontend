import { useNavigate, useRouteError } from "react-router";
import Button from "../../components/UI/Button";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  let title = "An Erorr accurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Sorry, this page isn't available";
    message =
      "The link you followed may be broken, or the page may have been removed.";
  }

  function handleNavigate() {
    navigate("/");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 max-w-[400px] w-full mx-auto p-4">
      <div>
        <h1 className="font-semibold text-center text-white pb-2">{title}</h1>
        <p className="font-normal  text-white opacity-50 text-center">
          {message}
        </p>
      </div>
      <Button onClick={handleNavigate} className="bg-white w-20 p-2">
        Back
      </Button>
    </div>
  );
}

export default Error;
