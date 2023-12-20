import { useContext } from "react";
import UserContext from "@/context/authenticationContext";
import AddEntry from "@/components/movie/addEntry";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user?.first_name ? (
        <div>
          <p>Welcome, {user.first_name}</p>
          <AddEntry />
        </div>
      ) : (
        <a href={"/account/login/"}>Please log in</a>
      )}
    </>
  );
}
