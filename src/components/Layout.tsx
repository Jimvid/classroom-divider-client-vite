import Header from "./Header"
import Footer from "../organisms/Footer"

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="max-w-wrapper mt-2 mb-2 mr-auto ml-auto">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
