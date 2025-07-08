import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Patrick Renz Garcia's Portfolio",
  description:
    "Explore the projects of Patrick Renz Garcia, showcasing skills in web development, design, and more.",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<LayoutProps>) => {
  return (
    <main className="flex flex-1 flex-col">
      <div className="max-w-screen-lg mx-auto w-full h-full pt-32">
        <div className="px-4 xl:px-0 mb-10">
          <h1 className="text-2xl font-semibold tracking-wider">Projects</h1>
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </main>
  );
};

export default Layout;
