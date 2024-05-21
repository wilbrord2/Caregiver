import { ReactNode } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";

const Root = ({ children }: { children: ReactNode }) => {
  return (
    <section className="bg-bgImage bg-cover bg-center bg-no-repeat">
      <Navbar />
     <div className="mx-auto max-w-[1700px] max-lg:pt-32">
      {children}
      </div>
      <Footer/>
    </section>
  );
};

export default Root;
