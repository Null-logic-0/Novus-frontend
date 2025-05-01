import { HeadProvider, Title } from "react-head";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getActivity } from "../../util/http";

import PagesHeader from "../../components/PagesHeader";
import MainContainer from "../../components/MainContainer";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import ActivityList from "../../components/ActivityList";

function Activity() {
  const { token } = useAuth();

  const {
    isPending,
    isError,
    error,
    data: userActivities,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivity(token),
  });
  return (
    <>
      <HeadProvider>
        <Title>Activity | Novus</Title>
      </HeadProvider>
      <div className="w-full justify-center mx-0 gap-5 flex flex-col items-center">
        <PagesHeader title="Activity" />
        <MainContainer>
          <section className="px-6 py-4">
            {isPending && (
              <div className="flex w-full justify-center items-center">
                <LoadingIndicator />
              </div>
            )}

            <ActivityList
              isError={isError}
              isPending={isPending}
              userActivities={userActivities}
            />

            {isError && (
              <p className="text-center text-white opacity-50 text-lg font-semibold">
                {error.message}
              </p>
            )}
          </section>
        </MainContainer>
      </div>
    </>
  );
}

export default Activity;
