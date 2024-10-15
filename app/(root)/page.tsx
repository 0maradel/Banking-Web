import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        {/* Navbar Section */}
        <header className="home-header">
          <Navbar />
        </header>

        {/* Popular Products Section */}
        <main className="home-main">
          <section className="site-section py-12">
            <div className="container mx-auto">
              <div className="row">
                <div className="title-section text-center w-full">
                  <h2 className="text-uppercase text-3xl font-bold">Popular Products</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center item mb-4">
                  <span className="tag bg-red-500 text-white px-2 py-1 rounded">Sale</span>
                  <a href="">
                    <Image src="/images/product_01.png" alt="Bioderma" width={250} height={250} className="max-w-xs h-auto" />
                  </a>
                  <h3 className="text-dark text-lg font-semibold">
                    <a href="">Bioderma</a>
                  </h3>
                  <p className="price">
                    <del>$95.00</del> &mdash; $55.00
                  </p>
                </div>
                <div className="text-center item mb-4">
                  <a href="">
                    <Image src="/images/product_02.png" alt="Chanca Piedra" width={250} height={250} />
                  </a>
                  <h3 className="text-dark text-lg font-semibold">
                    <a href="">Chanca Piedra</a>
                  </h3>
                  <p className="price">$70.00</p>
                </div>
                <div className="text-center item mb-4">
                  <a href="">
                    <Image src="/images/product_03.png" alt="Umcka Cold Care" width={250} height={250} />
                  </a>
                  <h3 className="text-dark text-lg font-semibold">
                    <a href="shop-single.html">Umcka Cold Care</a>
                  </h3>
                  <p className="price">$120.00</p>
                </div>

                <div className="text-center item mb-4">
                  <a href="">
                    <Image src="/images/product_04.png" alt="Cetyl Pure" width={250} height={250} />
                  </a>
                  <h3 className="text-dark text-lg font-semibold">
                    <a href="">Cetyl Pure</a>
                  </h3>
                  <p className="price">
                    <del>$45.00</del> &mdash; $20.00
                  </p>
                </div>
                <div className="text-center item mb-4">
                  <a href="">
                    <Image src="/images/product_05.png" alt="CLA Core" width={250} height={250} />
                  </a>
                  <h3 className="text-dark text-lg font-semibold">
                    <a href="">CLA Core</a>
                  </h3>
                  <p className="price">$38.00</p>
                </div>
                <div className="text-center item mb-4">
                  <span className="tag bg-red-500 text-white px-2 py-1 rounded">Sale</span>
                  <a href="">
                    <Image src="/images/product_06.png" alt="Poo Pourri" width={250} height={250} />
                  </a>
                  <h3 className="text-dark text-lg font-semibold">
                    <a href="">Poo Pourri</a>
                  </h3>
                  <p className="price">
                    <del>$89.00</del> &mdash; $38.00
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* New Products Section */}
        <div className="site-section bg-light">
            <div className="container">
              <div className="row">
                <div className="title-section text-center col-12">
                <h2 className="text-uppercase text-4xl font-bold">New Products</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 block-3 products-wrap">
                  <div className="flex flex-wrap justify-center">
                    <div className="text-center item mb-4">
                      <a href="shop-single.html"> 
                        <img src="images/product_03.png" alt="Image" />
                      </a>
                      <h3 className="text-dark">
                        <a href="shop-single.html">Umcka Cold Care</a>
                      </h3>
                      <p className="price">$120.00</p>
                    </div>

                    <div className="text-center item mb-4">
                      <a href="shop-single.html"> 
                        <img src="images/product_01.png" alt="Image" />
                      </a>
                      <h3 className="text-dark">
                        <a href="shop-single.html">Umcka Cold Care</a>
                      </h3>
                      <p className="price">$120.00</p>
                    </div>

                    <div className="text-center item mb-4">
                      <a href="shop-single.html"> 
                        <img src="images/product_02.png" alt="Image" />
                      </a>
                      <h3 className="text-dark">
                        <a href="shop-single.html">Umcka Cold Care</a>
                      </h3>
                      <p className="price">$120.00</p>
                    </div>

                    <div className="text-center item mb-4">
                      <a href="shop-single.html"> 
                        <img src="images/product_04.png" alt="Image" />
                      </a>
                      <h3 className="text-dark">
                        <a href="shop-single.html">Umcka Cold Care</a>
                      </h3>
                      <p className="price">$120.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <Footer />
      </div>
    </section>
  );
}

export default Home;
