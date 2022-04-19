import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './style.css';
const axios = require('axios');

class ProductsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      productsPopular: [],
      productsPrice: [],
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          "https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json"
        ),
        axios.get(
          "https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json"
        ),
      ])
      .then(
        axios.spread((data1, data2) => {
          var data_popular = data1["data"];
          var data_price = data2["data"];
          axios
            .post("http://localhost:3331/data", {
              data_popular,
              data_price,
              maxProducts: 16,
              response_type:'complete'
            })
            .then((response) => {
              this.setState({
                isLoaded: true,
                productsPopular: response["data"]["popular_products"],
                productsPrice: response["data"]["price_products"],
              });
            })
            .catch((error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            });
        })
      );
  }
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };
    const { error, isLoaded, productsPopular, productsPrice } = this.state;
    var count_popular = 1;

    if (error) {
      return <div className="center-loading "><div className="loading"></div></div>;
    } else if (!isLoaded) {
      return <div className="center-loading "><div className="loading"></div></div>;
    } else {
      return (
        <div className="container-content py-2">
          <div className="container">
            <h4>Vitrine de mais populares</h4>
          </div>
          <h5 className="center-text">Mais Vendidos</h5>
          <div className="container py-2">
            <Carousel
              ssr={true}
              itemClass="carousel-item-padding-40-px"
              responsive={responsive}
            >
              {productsPopular.map((product) => (
                <div className="product-info mx-2" key={product}>
                  <div className="row">
                    <div className="col">
                      <img alt="product" src={product.image_src} />
                    </div>
                    <div className="col">
                      <p className="position-count">
                        <span>{count_popular++}º</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="">{product.name}</span>
                    <div className="product-oldprice">
                      {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.oldprice)}
                    </div>
                    <div className="product-price">
                      Por <span> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span>
                    </div>
                    {product.count}x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / product.count)}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div>
            <div className="container py-5">
              <h4>Vitrine de ofertas</h4>
            </div>
            <h5 className="center-text">Produtos que baixaram de preço</h5>
          </div>
          <div className="container py-2">
            <Carousel
              ssr={true}
              itemClass="carousel-item-padding-40-px"
              responsive={responsive}
            >
              {productsPrice.map((product) => (
                <div className="container mx-2" key={product} >
                  <div className="row">
                    <div className="col-0">
                      <p className="product-discount">
                        <span>{product.discount}% </span>
                      </p>
                    </div>
                    <div className="col">
                      <img alt="product" src={product.image_src} />
                    </div>
                  </div>
                  <div className="">
                    {product.name}

                    <div className="product-oldprice">
                      {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.oldprice)}
                    </div>
                    <div className="product-price">
                      Por <span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span>
                    </div>
                    {product.count}x {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / product.count)}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      );
    }
  }
}

export default ProductsCarousel;
