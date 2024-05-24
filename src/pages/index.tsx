import { ReactNode, Suspense } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import Loading from "../Components/Skeleton";

const Root = ({ children }: { children: ReactNode }) => {
  return (
    <section className="bg-bgImage bg-cover bg-center bg-no-repeat">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <div className="mx-auto max-w-[1700px]">{children}</div>
      </Suspense>
      <Footer />
    </section>
  );
};

export default Root;
