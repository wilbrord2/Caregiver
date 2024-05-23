import { ReactNode, Suspense, useRef } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import { useAppContext } from "../context";
import Loading from "../Components/Skeleton";

const Root = ({ children }: { children: ReactNode }) => {
  const { setNavOnscroll } = useAppContext();
  const ref = useRef(null);

  const HandleScroll = () => {
    const scroll = ref.current;
    console.log({ scroll });
    setNavOnscroll(true);
  };

  return (
    <section className="bg-bgImage bg-cover bg-center bg-no-repeat">
      <Navbar />
      <Suspense fallback={<Loading />}>
      <div
        onChange={() => HandleScroll()}
        className="mx-auto max-w-[1700px] max-lg:pt-32"
      >
        {children}
      </div>
      </Suspense>
      <Footer />
    </section>
  );
};

export default Root;
