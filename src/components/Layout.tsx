import Header from "./Header"

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="max-w-wrapper mt-2 mb-2 mr-auto ml-auto">
        {children}
      </main>
    </>
  )
}

export default Layout
