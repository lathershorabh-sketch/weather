import Loader from "./component/Loader";
import Searchbar from "./component/Searchbar";
import Weather from "./component/Weather";

export default function Home() {
  return (
    <main>
      <Searchbar />
      <Weather />
      <Loader />
    </main>
  );
}