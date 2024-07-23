"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Navigation from "@/app/components/navigation";
import ServicesCard from "@/app/components/services-card";
import httpService from "@/services/httpService";
import { CONTROLLER, METHOD } from "@/constants/apiConstants";
import ProductCard from "@/app/components/product-card";
import Modal from "@/app/components/modal";
import ItemModal from "@/app/components/item-modal";
import CartModal from "@/app/components/cart-modal";
import ContactModal from "@/app/components/contactus-modal";

const Dashboard = ({ bakeryName }) => {
  const [bakeryDetail, setBakeryDetail] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isContactOpen, setIsContactModalOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const homeSection = useRef(null);
  const aboutSection = useRef(null);
  const menuSection = useRef(null);
  const contactSection = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const menuDetail = useMemo(() => {
    return bakeryDetail?.products.filter(
      (product) => product.category === selectedCategory
    );
  }, [bakeryDetail, selectedCategory]);
  useEffect(() => {
    httpService(bakeryName, METHOD.GET, null, CONTROLLER.BAKERY).then(
      (bakery) => {
        if (bakery) {
          setBakeryDetail(bakery.data);
          const rawCategories = bakery.data.products.map(
            (product) => product.category
          );
          const currentCategories = rawCategories.filter(
            (item, i, ar) => ar.indexOf(item) === i
          );
          setCategories([...currentCategories]);
          setSelectedCategory(currentCategories.at(0));
        }
      }
    );
  }, []);

  const changeProductView = (ev) => {
    setSelectedCategory(ev.target.outerText);
  };

  const addDataToCart = (addItem) => {
    const cartVariant = cartData.filter(
      (cartItem) =>
        cartItem.productId === addItem.productId &&
        cartItem.variantId === addItem.variantId
    );
    if (cartVariant.length > 0) {
      let tempCartData = cartData.map((cartItem) => {
        if (
          cartItem.productId === addItem.productId &&
          cartItem.variantId === addItem.variantId
        ) {
          return addItem;
        }
        return cartItem;
      });
      setCartData([...tempCartData]);
    } else {
      setCartData([...cartData, addItem]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const selectItemToAdd = (currentItem) => {
    setItemSelected({ ...currentItem });
    openModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const scrollToSection = (num) => {
    switch (num) {
      case 1:
        window.scrollTo({
          top: homeSection.current.offsetTop,
          behavior: "smooth",
        });
        break;
      case 2:
        window.scrollTo({
          top: aboutSection.current.offsetTop - 120,
          behavior: "smooth",
        });
        break;
      case 3:
        window.scrollTo({
          top: menuSection.current.offsetTop - 120,
          behavior: "smooth",
        });
        break;
      case 4:
        window.scrollTo({
          top: contactSection.current.offsetTop - 120,
          behavior: "smooth",
        });
        break;
    }
  };
  return (
    <>
      {itemSelected && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ItemModal
            cartData={cartData}
            itemSelected={itemSelected}
            closeModal={closeModal}
            addDataToCart={addDataToCart}
          />
        </Modal>
      )}
      {cartData.length > 0 && (
        <Modal isOpen={isCartModalOpen} onClose={setIsCartModalOpen}>
          <CartModal
            cartData={cartData}
            bakeryDetail={bakeryDetail}
            closeModal={closeCartModal}
          />
        </Modal>
      )}
      {bakeryDetail && (
        <Modal isOpen={isContactOpen} onClose={setIsContactModalOpen}>
          <ContactModal
            shopName={bakeryDetail.name}
            closeModal={closeContactModal}
          />
        </Modal>
      )}
      {bakeryDetail && (
        <>
          {" "}
          <div ref={homeSection} className="home-container">
            <Head>
              <title>{bakeryDetail.name}</title>
              <meta property="og:title" content="Food Agency Shops" />
            </Head>
            <Navigation
              openCartModal={openCartModal}
              scrollToSection={scrollToSection}
              logo={bakeryDetail.logo}
            ></Navigation>
            <main className="home-main">
              <div className="home-hero section-container">
                <div className="home-max-width max-content-container">
                  <div className="home-heading-container">
                    <h1 className="home-text Heading1">
                      <span>{bakeryDetail.heading.h1}</span>
                      <br></br>
                      <span>{bakeryDetail.heading.h2}</span>
                    </h1>
                    <span className="home-text03">
                      <span>{bakeryDetail.heading.h3}</span>
                      <br></br>
                    </span>
                    <button
                      onClick={openContactModal}
                      className="home-primary button-primary button-lg button"
                    >
                      Get in touch with us
                    </button>
                  </div>
                  <div className="home-gallery">
                    <div className="home-container1">
                      <img
                        alt="image"
                        src={bakeryDetail.pics.pic1}
                        className="home-image"
                        width={220}
                        height={481}
                      />
                    </div>
                    <div className="home-container2">
                      <img
                        alt="image"
                        src={bakeryDetail.pics.pic2}
                        className="home-image1"
                        width={220}
                        height={208}
                      />
                      <img
                        alt="image"
                        src={bakeryDetail.pics.pic3}
                        className="home-image2"
                        width={220}
                        height={253}
                      />
                    </div>
                    <div className="home-container3">
                      <img
                        alt="image"
                        src={bakeryDetail.pics.pic4}
                        className="home-image3"
                        width={472}
                        height={273}
                      />
                      <div className="home-container4">
                        <img
                          alt="image"
                          src={bakeryDetail.pics.pic5}
                          className="home-image4"
                          width={220}
                          height={188}
                        />
                        <img
                          alt="image"
                          src={bakeryDetail.pics.pic6}
                          className="home-image5"
                          width={220}
                          height={188}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-services section-container">
                <div className="home-max-width1 max-content-container">
                  <div className="home-heading-container1">
                    <div className="home-text-container">
                      <span className="home-text07">our services</span>
                      <h2 className="Heading2">
                        <span>
                          We provide a wide range of
                          <span
                            dangerouslySetInnerHTML={{
                              __html: " ",
                            }}
                          />
                        </span>
                        <br></br>
                        <span>Services</span>
                      </h2>
                    </div>
                    <div className="home-controls">
                      <button className="control-btn">
                        <svg viewBox="0 0 1024 1024" className="home-icon">
                          <path d="M402.746 877.254l-320-320c-24.994-24.992-24.994-65.516 0-90.51l320-320c24.994-24.992 65.516-24.992 90.51 0 24.994 24.994 24.994 65.516 0 90.51l-210.746 210.746h613.49c35.346 0 64 28.654 64 64s-28.654 64-64 64h-613.49l210.746 210.746c12.496 12.496 18.744 28.876 18.744 45.254s-6.248 32.758-18.744 45.254c-24.994 24.994-65.516 24.994-90.51 0z"></path>
                        </svg>
                      </button>
                      <button className="control-btn">
                        <svg viewBox="0 0 1024 1024" className="home-icon02">
                          <path d="M621.254 877.254l320-320c24.994-24.992 24.994-65.516 0-90.51l-320-320c-24.994-24.992-65.516-24.992-90.51 0-24.994 24.994-24.994 65.516 0 90.51l210.746 210.746h-613.49c-35.346 0-64 28.654-64 64s28.654 64 64 64h613.49l-210.746 210.746c-12.496 12.496-18.744 28.876-18.744 45.254s6.248 32.758 18.744 45.254c24.994 24.994 65.516 24.994 90.51 0z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="home-cards-container">
                    {bakeryDetail.service.map((bakery) => {
                      return (
                        <ServicesCard
                          text={bakery.heading}
                          text1={bakery.para}
                          imageSrc={bakery.imageSrc}
                        ></ServicesCard>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div ref={menuSection} className="section-container">
                <div className="home-max-width2 max-content-container">
                  <div className="home-text-container1">
                    <span className="home-text12">our menu</span>
                    {/* <h2 className="home-text13 Heading2">
                      <span>Explore our menu</span>
                    </h2>
                    <span className="home-text15">
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut
                        <span
                          dangerouslySetInnerHTML={{
                            __html: " ",
                          }}
                        />
                      </span>
                      <br></br>
                      <span>
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation.
                      </span>
                    </span> */}
                    {/* <button className="button-secondary button-lg button">
                      See all projects
                    </button> */}
                  </div>
                  {categories && (
                    <div className="home-tab-selector-header">
                      {categories.map((cate) => {
                        return (
                          <span
                            onClick={(e) => changeProductView(e)}
                            className="home-text19 tab-selector-btn"
                          >
                            {cate}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  <div className="home-tab-selector-cards-container">
                    {menuDetail.map((menuItem) => {
                      return (
                        <ProductCard
                          menuItem={menuItem}
                          openModal={selectItemToAdd}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div ref={aboutSection} className="home-about section-container">
                <div className="home-max-width3 max-content-container">
                  <div className="home-text-container2">
                    <span className="home-text25">about us</span>
                    <h2 className="home-text26 Heading2">
                      <span>
                        {bakeryDetail.about_us.heading}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: " ",
                          }}
                        />
                      </span>
                      <br></br>
                    </h2>
                    <span className="home-text30">
                      {bakeryDetail.about_us.para}
                    </span>
                    <div className="home-checklist">
                      {bakeryDetail.about_us.para_points.map((bakeryPoint) => {
                        return (
                          <div className="home-check-item">
                            <svg
                              viewBox="0 0 1024 1024"
                              className="home-icon04"
                            >
                              <path d="M384 690l452-452 60 60-512 512-238-238 60-60z"></path>
                            </svg>
                            <span className="home-text31">{bakeryPoint}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="home-image-container">
                    <img
                      alt="image"
                      src="/milletsandmore.jpeg"
                      className="home-image6"
                      width={460}
                      height={512}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="home-process section-container">
                <div className="home-max-width4 max-content-container">
                  <span className="home-text37">Our process</span>
                  <h2 className="home-text38 Heading2">
                    <span>
                      We use a simple three step process.
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <br></br>
                    <span>Take a look.</span>
                  </h2>
                  <div className="home-step">
                    <span className="home-text42">01</span>
                    <div className="home-container5">
                      <span className="home-text43">Finding the best idea</span>
                      <span className="home-text44">
                        There are countless businesses already in existence, so
                        it’s very likely that you won’t be the first person to
                        think of an idea or product. There are countless
                        businesses already in existence, so it’s very likely
                        that you won’t be the first person to think of an idea
                        or product.
                        <span
                          dangerouslySetInnerHTML={{
                            __html: " ",
                          }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="home-step1">
                    <span className="home-text45">02</span>
                    <div className="home-container6">
                      <span className="home-text46">
                        Intense Brain storming
                        <span
                          dangerouslySetInnerHTML={{
                            __html: " ",
                          }}
                        />
                      </span>
                      <span className="home-text47">
                        Brainstorming is a process of toiling and generating new
                        ideas alone or by holding intensive group discussions
                        between team members in a team.
                      </span>
                    </div>
                  </div>
                  <div className="home-step2">
                    <span className="home-text48">03</span>
                    <div className="home-container7">
                      <span className="home-text49">
                        Strong design execution
                      </span>
                      <span className="home-text50">
                        As a creative, using your professional judgement, you
                        should begin filtering your various ideas and designs,
                        retaining the strongest relevant material.
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="section-container">
                <div className="home-max-width5 max-content-container">
                  <span className="home-text51">from blog</span>
                  <h2 className="home-text52 Heading2">
                    <span>Our latest articles and resources</span>
                  </h2>
                  <span className="home-text54">
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <br></br>
                    <span>
                      ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation.
                    </span>
                  </span>
                  <button className="home-primary2 button-secondary button-lg button">
                    Explore the blog
                  </button>
                  <div className="home-blog-cards-container">
                    <BlogCard rootClassName="blog-card-root-class-name"></BlogCard>
                    <BlogCard
                      text1="Aug 14, 2022"
                      button="advertising"
                      imageSrc="/rectangle%2099%20%5B1%5D-1500w.png"
                      rootClassName="blog-card-root-class-name1"
                    ></BlogCard>
                    <BlogCard
                      text1="Jul 12, 2022"
                      button="Branding"
                      imageSrc="/unsplash_h7qmwoxf6z8-1500w.png"
                    ></BlogCard>
                  </div>
                </div>
              </div> */}
              <div
                ref={contactSection}
                className="home-banner section-container"
              >
                <div className="home-max-width6 max-content-container">
                  <span className="home-text58">what are you waiting?</span>
                  <h2 className="home-text59 Heading2">
                    <span>Let’s collaborate!</span>
                  </h2>
                  <span className="home-text61">
                    <span>
                      For clients seeking sweet collaborations, where dreams are
                      baked with delight,
                      <span
                        dangerouslySetInnerHTML={{
                          __html: " ",
                        }}
                      />
                    </span>
                    <br></br>
                    <span>
                      Join hands with us, where every confection tells a tale,
                      pure and bright.
                    </span>
                  </span>
                  <button
                    onClick={openContactModal}
                    className="home-primary3 button-lg button-secondary-white button"
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </main>
            {/* <div className="section-container">
              <div className="max-content-container">
                <div className="home-top-part">
                  <div className="home-links-container">
                    <div className="home-product-container">
                      <span className="home-text65">Product</span>
                      <span className="home-text66">About</span>
                      <span className="home-text67">Portofolio</span>
                      <span>Blog</span>
                    </div>
                    <div className="home-navigate-container">
                      <span className="home-text69">Navigate</span>
                      <span className="home-text70">Copyrights</span>
                      <span className="home-text71">Sitemap</span>
                      <span>Privacy Policy</span>
                    </div>
                    <div className="home-contact-container">
                      <span className="home-text73">Contact Us</span>
                      <span className="home-text74">
                        <span>2157 Village View</span>
                        <br></br>
                        <span>
                          Drive, Old Fort
                          <span
                            dangerouslySetInnerHTML={{
                              __html: " ",
                            }}
                          />
                        </span>
                        <br></br>
                        <span>
                          Myers Florida
                          <span
                            dangerouslySetInnerHTML={{
                              __html: " ",
                            }}
                          />
                        </span>
                        <br></br>
                        <span>33901</span>
                      </span>
                    </div>
                  </div>
                  <div className="home-subscribe-container">
                    <span className="home-text82">
                      Subscribe to our newsletter
                    </span>
                    <input
                      type="text"
                      placeholder="Enter your e-mail address"
                      className="home-textinput input"
                    />
                    <button className="button-primary button">Subscribe</button>
                  </div>
                </div>
              </div>
              <div className="home-separator"></div>
              <footer className="home-max-width8 max-content-container">
                <img
                  alt="image"
                  src="/logo1-200h.png"
                  className="home-image7"
                />
                <span className="home-text83">
                  <span>
                    All rights recived @
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span className="home-text85">
                    aesthetics
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span>
                    | Designed by
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                  <span className="home-text87">teleporhq.io</span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: " ",
                      }}
                    />
                  </span>
                </span>
              </footer>
            </div> */}
          </div>
          <style jsx>
            {`
              .home-container {
                width: 100%;
                display: flex;
                position: relative;
                min-height: 100vh;
                overflow-x: hidden;
                align-items: center;
                flex-direction: column;
              }
              .home-main {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              }
              .home-hero {
                position: relative;
                padding-top: 128px;
              }
              .home-max-width {
                margin-top: var(--dl-space-space-threeunits);
              }
              .home-heading-container {
                flex: 1;
                display: flex;
                max-width: 100%;
                align-items: center;
                flex-direction: column;
                justify-content: center;
              }
              .home-text {
                text-align: center;
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .home-text03 {
                color: var(--dl-color-scheme-black);
                font-size: 18px;
                text-align: center;
                line-height: 1.44;
                margin-bottom: var(--dl-space-space-twounits);
              }
              .home-primary {
                margin-bottom: var(--dl-space-space-threeunits);
              }
              .home-gallery {
                width: 100%;
                display: flex;
                grid-gap: 20px;
                align-items: stretch;
              }
              .home-container1 {
                width: 25%;
                align-self: stretch;
              }
              .home-image {
                object-fit: cover;
                border-radius: var(--dl-radius-radius-radius8);
              }
              .home-container2 {
                width: 25%;
                display: flex;
                grid-gap: 20px;
                align-items: stretch;
                flex-direction: column;
              }
              .home-image1 {
                object-fit: cover;
                border-radius: var(--dl-radius-radius-radius8);
              }
              .home-image2 {
                object-fit: cover;
                border-radius: var(--dl-radius-radius-radius8);
              }
              .home-container3 {
                width: 50%;
                display: flex;
                grid-gap: 20px;
                flex-direction: column;
              }
              .home-image3 {
                object-fit: cover;
                border-radius: var(--dl-radius-radius-radius8);
              }
              .home-container4 {
                width: 100%;
                display: flex;
                grid-gap: 20px;
              }
              .home-image4 {
                flex: 1;
                object-fit: cover;
                border-radius: var(--dl-radius-radius-radius8);
              }
              .home-image5 {
                flex: 1;
                object-fit: cover;
                border-radius: var(--dl-radius-radius-radius8);
              }
              .home-services {
                display: flex;
                padding-top: var(--dl-space-space-fiveunits);
                flex-direction: column;
                background-color: var(--dl-color-scheme-lightbrown);
              }
              .home-max-width1 {
                flex-direction: column;
              }
              .home-heading-container1 {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                align-items: flex-end;
                margin-bottom: var(--dl-space-space-fourunits);
                flex-direction: row;
                justify-content: space-between;
              }
              .home-text-container {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              }
              .home-text07 {
                color: var(--dl-color-scheme-brown);
                font-style: normal;
                text-align: center;
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }
              .home-controls {
                display: grid;
                grid-gap: 12px;
                grid-template-columns: 1fr 1fr;
              }
              .home-icon {
                width: 16px;
                height: 16px;
              }
              .home-icon02 {
                width: 16px;
                height: 16px;
              }
              .home-cards-container {
                width: 100%;
                display: flex;
                grid-gap: 20px;
              }
              .home-max-width2 {
                flex-direction: column;
              }
              .home-text-container1 {
                display: flex;
                align-items: center;
                margin-bottom: var(--dl-space-space-fourunits);
                flex-direction: column;
              }
              .home-text12 {
                color: var(--dl-color-scheme-brown);
                font-style: normal;
                text-align: center;
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }
              .home-text13 {
                text-align: center;
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text15 {
                color: var(--dl-color-scheme-black80);
                text-align: center;
                line-height: 26px;
                margin-bottom: var(--dl-space-space-twounits);
              }
              .home-tab-selector-header {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: flex-start;
                margin-bottom: var(--dl-space-space-threeunits);
                flex-direction: row;
                justify-content: center;
              }
              .home-text19 {
                margin-right: 30px;
              }
              .home-text20 {
                margin-right: 30px;
              }
              .home-text21 {
                margin-right: 30px;
              }
              .home-text22 {
                margin-right: 30px;
              }
              .home-text23 {
                margin-right: 30px;
              }
              .home-tab-selector-cards-container {
                width: 100%;
                display: grid;
                grid-row-gap: 40px;
                grid-column-gap: 20px;
                grid-template-rows: repeat(2, 1fr);
                grid-template-columns: repeat(3, 1fr);
              }
              .home-about {
                background-color: var(--dl-color-scheme-lightbrown);
              }
              .home-max-width3 {
                flex-direction: row;
                justify-content: space-between;
              }
              .home-text-container2 {
                flex: 1;
                width: 40%;
                display: flex;
                align-items: flex-start;
                margin-right: var(--dl-space-space-unit);
                flex-direction: column;
              }
              .home-text25 {
                color: var(--dl-color-scheme-brown);
                font-style: normal;
                text-align: center;
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }
              .home-text26 {
                margin-bottom: var(--dl-space-space-oneandhalfunits);
              }
              .home-text30 {
                color: var(--dl-color-scheme-black80);
                line-height: 26px;
                margin-bottom: var(--dl-space-space-twounits);
              }
              .home-checklist {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              }
              .home-check-item {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                margin-bottom: var(--dl-space-space-unit);
                flex-direction: row;
              }
              .home-icon04 {
                fill: var(--dl-color-scheme-brown);
                width: 18px;
                height: 18px;
                margin-right: var(--dl-space-space-unit);
              }
              .home-text31 {
                font-style: normal;
                font-weight: 500;
              }
              .home-check-item1 {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                margin-bottom: var(--dl-space-space-unit);
                flex-direction: row;
              }
              .home-icon06 {
                fill: var(--dl-color-scheme-brown);
                width: 18px;
                height: 18px;
                margin-right: var(--dl-space-space-unit);
              }
              .home-text32 {
                font-style: normal;
                font-weight: 500;
              }
              .home-check-item2 {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                margin-bottom: var(--dl-space-space-unit);
                flex-direction: row;
              }
              .home-icon08 {
                fill: var(--dl-color-scheme-brown);
                width: 18px;
                height: 18px;
                margin-right: var(--dl-space-space-unit);
              }
              .home-text33 {
                font-style: normal;
                font-weight: 500;
              }
              .home-check-item3 {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                margin-bottom: var(--dl-space-space-unit);
                flex-direction: row;
              }
              .home-icon10 {
                fill: var(--dl-color-scheme-brown);
                width: 18px;
                height: 18px;
                margin-right: var(--dl-space-space-unit);
              }
              .home-text34 {
                font-style: normal;
                font-weight: 500;
              }
              .home-check-item4 {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                margin-bottom: var(--dl-space-space-unit);
                flex-direction: row;
              }
              .home-icon12 {
                fill: var(--dl-color-scheme-brown);
                width: 18px;
                height: 18px;
                margin-right: var(--dl-space-space-unit);
              }
              .home-text35 {
                font-style: normal;
                font-weight: 500;
              }
              .home-check-item5 {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                flex-direction: row;
              }
              .home-icon14 {
                fill: var(--dl-color-scheme-brown);
                width: 18px;
                height: 18px;
                margin-right: var(--dl-space-space-unit);
              }
              .home-text36 {
                font-style: normal;
                font-weight: 500;
              }
              .home-image6 {
                flex: 1;
                object-fit: cover;
                border-radius: var(--dl-radius-radius-radius8);
              }
              .home-process {
                background-color: var(--dl-color-scheme-lightblue);
              }
              .home-max-width4 {
                align-items: flex-start;
                flex-direction: column;
                justify-content: space-between;
              }
              .home-text37 {
                color: var(--dl-color-scheme-white);
                font-style: normal;
                text-align: center;
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }
              .home-text38 {
                color: var(--dl-color-scheme-white);
                margin-bottom: var(--dl-space-space-fourunits);
              }
              .home-step {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                border-color: rgba(255, 255, 255, 0.2);
                border-width: 1px;
                margin-bottom: var(--dl-space-space-fourunits);
                flex-direction: row;
                padding-bottom: 53px;
                border-top-width: 0px;
                border-left-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 1px;
              }
              .home-text42 {
                color: var(--dl-color-scheme-white);
                font-size: 64px;
                font-style: normal;
                font-weight: 500;
                line-height: 61px;
                margin-right: 180px;
              }
              .home-container5 {
                flex: 1;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              }
              .home-text43 {
                color: var(--dl-color-scheme-white);
                font-size: 24px;
                line-height: 31px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text44 {
                color: var(--dl-color-scheme-white80);
              }
              .home-step1 {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                border-color: rgba(255, 255, 255, 0.2);
                border-width: 1px;
                margin-bottom: var(--dl-space-space-fourunits);
                flex-direction: row;
                padding-bottom: 53px;
                border-top-width: 0px;
                border-left-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 1px;
              }
              .home-text45 {
                color: var(--dl-color-scheme-white);
                font-size: 64px;
                font-style: normal;
                font-weight: 500;
                line-height: 61px;
                margin-right: 180px;
              }
              .home-container6 {
                flex: 1;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              }
              .home-text46 {
                color: var(--dl-color-scheme-white);
                font-size: 24px;
                line-height: 31px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text47 {
                color: var(--dl-color-scheme-white80);
              }
              .home-step2 {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                border-color: rgba(255, 255, 255, 0.2);
                border-width: 1px;
                flex-direction: row;
                padding-bottom: 53px;
                border-top-width: 0px;
                border-left-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 1px;
              }
              .home-text48 {
                color: var(--dl-color-scheme-white);
                font-size: 64px;
                font-style: normal;
                font-weight: 500;
                line-height: 61px;
                margin-right: 180px;
              }
              .home-container7 {
                flex: 1;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              }
              .home-text49 {
                color: var(--dl-color-scheme-white);
                font-size: 24px;
                line-height: 31px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text50 {
                color: var(--dl-color-scheme-white80);
              }
              .home-max-width5 {
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
              }
              .home-text51 {
                color: var(--dl-color-scheme-brown);
                font-style: normal;
                text-align: center;
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }
              .home-text52 {
                text-align: center;
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text54 {
                color: var(--dl-color-scheme-black80);
                text-align: center;
                line-height: 26px;
                margin-bottom: var(--dl-space-space-twounits);
              }
              .home-primary2 {
                margin-bottom: var(--dl-space-space-threeunits);
              }
              .home-blog-cards-container {
                flex: 0 0 auto;
                width: 100%;
                display: flex;
                align-items: flex-start;
                flex-direction: row;
                justify-content: space-between;
              }
              .home-banner {
                background-color: var(--dl-color-scheme-brown);
              }
              .home-max-width6 {
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
              }
              .home-text58 {
                color: var(--dl-color-scheme-white);
                font-style: normal;
                text-align: center;
                font-weight: 700;
                margin-bottom: 4px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }
              .home-text59 {
                color: var(--dl-color-scheme-white);
                text-align: center;
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text61 {
                color: var(--dl-color-scheme-white);
                text-align: center;
                line-height: 26px;
                margin-bottom: var(--dl-space-space-twounits);
              }
              .home-primary3 {
                margin-bottom: var(--dl-space-space-threeunits);
              }
              .home-top-part {
                width: 100%;
                display: flex;
                align-items: stretch;
                flex-direction: row;
                justify-content: space-between;
              }
              .home-links-container {
                width: 50%;
                display: flex;
                align-items: flex-start;
                flex-direction: row;
                justify-content: space-between;
              }
              .home-product-container {
                flex: 0 0 auto;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                justify-content: flex-start;
              }
              .home-text65 {
                color: var(--dl-color-scheme-brown);
                font-weight: 700;
                margin-bottom: var(--dl-space-space-oneandhalfunits);
              }
              .home-text66 {
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text67 {
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-navigate-container {
                flex: 0 0 auto;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                justify-content: flex-start;
              }
              .home-text69 {
                color: var(--dl-color-scheme-brown);
                font-weight: 700;
                margin-bottom: var(--dl-space-space-oneandhalfunits);
              }
              .home-text70 {
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-text71 {
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-contact-container {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                justify-content: flex-start;
              }
              .home-text73 {
                color: var(--dl-color-scheme-brown);
                font-weight: 700;
                margin-bottom: var(--dl-space-space-oneandhalfunits);
              }
              .home-text74 {
                margin-bottom: var(--dl-space-space-unit);
              }
              .home-subscribe-container {
                flex: 0 0 auto;
                width: 35%;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
              }
              .home-text82 {
                color: var(--dl-color-scheme-brown);
                font-weight: 700;
                margin-bottom: var(--dl-space-space-oneandhalfunits);
              }
              .home-textinput {
                outline: none;
                align-self: stretch;
                padding-top: 4px;
                border-color: rgba(0, 0, 0, 0.1);
                padding-left: 0px;
                border-radius: 0px;
                margin-bottom: var(--dl-space-space-twounits);
                padding-bottom: 4px;
                border-top-width: 0px;
                border-left-width: 0px;
                border-right-width: 0px;
                border-bottom-width: 1px;
              }
              .home-separator {
                width: 100%;
                height: 1px;
                margin-top: var(--dl-space-space-twounits);
                margin-bottom: var(--dl-space-space-twounits);
                background-color: #d9d9d9;
              }
              .home-max-width8 {
                flex-direction: row;
                justify-content: space-between;
              }
              .home-image7 {
                width: 100px;
                object-fit: cover;
              }
              .home-text83 {
                align-self: center;
              }
              .home-text85 {
                font-weight: 700;
              }
              .home-text87 {
                font-weight: 700;
              }
              @media (max-width: 991px) {
                .home-heading-container {
                  max-width: 100%;
                  margin-bottom: 42px;
                }
                .home-gallery {
                  flex-direction: column;
                }
                .home-container1 {
                  width: 100%;
                }
                .home-container2 {
                  width: 100%;
                  flex-direction: row;
                }
                .home-container3 {
                  width: 100%;
                  align-items: stretch;
                }
                .home-tab-selector-cards-container {
                  grid-template-columns: repeat(2, 1fr);
                }
                .home-max-width3 {
                  flex-direction: column;
                }
                .home-text-container2 {
                  width: 100%;
                  margin-right: 0px;
                  margin-bottom: var(--dl-space-space-oneandhalfunits);
                }
                .home-image-container {
                  width: 100%;
                }
                .home-image6 {
                  width: 100%;
                }
                .home-blog-cards-container {
                  align-items: center;
                  flex-direction: column;
                }
              }
              @media (max-width: 767px) {
                .home-text {
                  font-size: 48px;
                }
                .home-container2 {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                }
                .home-image1 {
                  height: 100%;
                }
                .home-container4 {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                }
                .home-image4 {
                  width: 100%;
                }
                .home-image5 {
                  width: 100%;
                }
                .home-tab-selector-cards-container {
                  grid-template-columns: 1fr;
                }
                .home-text42 {
                  margin-right: var(--dl-space-space-fourunits);
                }
                .home-text45 {
                  margin-right: var(--dl-space-space-fourunits);
                }
                .home-text48 {
                  margin-right: var(--dl-space-space-fourunits);
                }
                .home-top-part {
                  align-items: center;
                  flex-direction: column;
                  justify-content: space-between;
                }
                .home-links-container {
                  width: 100%;
                  align-items: flex-start;
                  margin-bottom: var(--dl-space-space-oneandhalfunits);
                  flex-direction: row;
                }
                .home-subscribe-container {
                  width: 100%;
                }
              }
              @media (max-width: 479px) {
                .home-text42 {
                  margin-right: var(--dl-space-space-twounits);
                }
                .home-text45 {
                  margin-right: var(--dl-space-space-twounits);
                }
                .home-text48 {
                  margin-right: var(--dl-space-space-twounits);
                }
                .home-top-part {
                  align-items: center;
                  flex-direction: column;
                }
                .home-links-container {
                  gap: var(--dl-space-space-twounits);
                  flex-direction: column;
                  justify-content: flex-start;
                }
                .home-contact-container {
                  align-items: flex-start;
                  margin-bottom: 0px;
                }
                .home-max-width8 {
                  flex-direction: column;
                }
                .home-image7 {
                  margin-bottom: var(--dl-space-space-unit);
                }
                .home-text83 {
                  text-align: center;
                }
              }
            `}
          </style>
        </>
      )}
    </>
  );
};

export default Dashboard;
