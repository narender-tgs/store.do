import { useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "rc-tree/assets/index.css";
import "react-input-range/lib/css/index.css";
import "react-image-lightbox/style.css";
import "react-toastify/dist/ReactToastify.min.css";

// Import Custom Coponent
import StickyNavbar from "./common/partials/sticky-navbar";
import Header from "./common/header";
import Footer from "./common/footer";
// import MobileMenu from "./common/partials/mobile-menu";
// import QuickModal from "../components/features/modals/quickview";
// import VideoModal from "../components/features/modals/video-modal";

// Import Modal Action
import { actions } from "../store/modal";

// Import Utils
import { stickyInit, scrollTopHandlder, scrollTopInit } from "../utils";

function Layout({ children }) {
  useEffect(() => {
    window.addEventListener("scroll", stickyInit, { passive: true });
    window.addEventListener("scroll", scrollTopInit, { passive: true });
    window.addEventListener("resize", stickyInit);
    // hideQuickView();
    // hideVideo();

    return () => {
      window.removeEventListener("scroll", stickyInit, { passive: true });
      window.removeEventListener("scroll", scrollTopInit, { passive: true });
      window.removeEventListener("resize", stickyInit);
    };
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <Header />

        {children}

        <Footer />

        <ToastContainer
          autoClose={3000}
          duration={300}
          newestOnTo={true}
          draggable={false}
          className="toast-container"
          position="bottom-right"
          closeButton={false}
          hideProgressBar={true}
          newestOnTop={true}
        />

        {/* <QuickModal />
                <VideoModal /> */}

        <div className="wishlist-popup">
          <div className="wishlist-popup-msg">Product added!</div>
        </div>
      </div>

      {/* <MobileMenu /> */}
      <StickyNavbar />

      <a
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="btn-scroll"
        onClick={scrollTopHandlder}
      >
        <i className="icon-angle-up"></i>
      </a>
    </>
  );
}

export default Layout;
