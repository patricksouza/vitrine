import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './style.css';
const axios = require('axios');



export default function Home() {

    const [productsPopular, setProductsPopular] = useState([]);
    const [productsPrice, setProductsPrice] = useState([]);

    useEffect(() => {

        axios.all([
            axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/mostpopular.json'),
            axios.get('https://wishlist.neemu.com/onsite/impulse-core/ranking/pricereduction.json'),
        ])
            .then(axios.spread((data1, data2) => {
                var data_popular = data1['data'];
                var data_price = data2['data'];
                axios.post('http://localhost:3333/data', {
                    data_popular,
                    data_price,
                    maxProducts: 10
                })
                    .then(function (response) {
                        ///console.log(response['data']);
                        setProductsPopular(response['data']['popular_products']);
                        setProductsPrice(response['data']['price_products']);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            }));
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    var count_popular = 1;
    return (
        <div className="container-content">
            <h5 className="center-text">Mais Vendidos</h5>
            <div className="container">
                <Carousel
                    ssr={true}
                    itemClass="carousel-item-padding-40-px"
                    responsive={responsive}>
                    {productsPopular.map((product) => (
                        <div className="product-info" key={product.id}>
                            <div className="row">

                                <div className="col">
                                    <img alt="product" src={product.image_src} />
                                </div>
                                <div className="col">
                                    <p className="position-count"><span>{count_popular++}º</span></p>
                                </div>
                            </div>
                            <div>
                                {product.name}
                            </div>
                            <div>
                                <p className="">
                                    R$ {product.price}
                                </p>
                                <p>
                                    10x R$ {(product.price / 10).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
            <hr></hr>
            <h5 className="center-text py-2">Produtos que baixaram de preço</h5>
            <div className="container py-2">

                <Carousel
                    ssr={true}
                    itemClass="carousel-item-padding-40-px"
                    responsive={responsive}>
                    {productsPrice.map((product) => (
                        <div key={product.id} className="container">
                            <div className="row">
                                <div className="col-0">
                                    <p className="product-discount"><span>50%</span></p>
                                </div>
                                <div className="col">
                                    <img alt="product" src={product.image_src} />
                                </div>
                            </div>
                            <div>
                                {product.name}
                            </div>
                            <div>
                                <p>
                                    R$ {product.price}
                                </p>
                                <p>
                                      10x R$ {(product.price / 10).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
