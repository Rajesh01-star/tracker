import Navbar from "./Components/Navbar";
import Auth from "./Pages/Auth";

export default function Home() {
  return (
    <section>
      <Navbar />
      {/* <SignUp /> */}
      <Auth authName="login" />
    </section>
  );
}
