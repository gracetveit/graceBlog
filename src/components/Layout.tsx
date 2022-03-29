import NavBar from "./NavBar";

export default ({ children }) => {
  return (
    <>
      <NavBar></NavBar>
      <main>{children}</main>
    </>
  );
};
