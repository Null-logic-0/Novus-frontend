import { Helmet } from "react-helmet";
import { useParams } from "react-router";

function Profile() {
  const params = useParams();
  return (
    <>
      <Helmet>
        <title>{params.slug} | Novus</title>
      </Helmet>

      <div>Profile</div>
    </>
  );
}

export default Profile;
