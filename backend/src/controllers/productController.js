// Conexão com o banco de dados
const connection = require('../database/connection');
const catalog = require('../json/catalog.json');


module.exports = {

    async index(request, response) {
        const popular_id = request.body['data_price'];
        const price_id = request.body['data_popular'];
        const maxProducts = request.body['maxProducts'];
        const response_type = request.body['response_type'];
        var data = [];

        await connection('product').select('id')
            .then(async (row) => {
                if (row.length == []) {
                    for (var [key, value] of catalog.entries()) {
                        var img_src = '';
                        if (catalog[key]['status'] == 'AVAILABLE' || catalog[key]['status'] == 'available') {
                            if (catalog[key]['images']['imagem1'] != null) {
                                img_src = catalog[key]['images']['imagem1'];
                            }
                            else if (catalog[key]['images']['imagem2'] != null) {
                                img_src = catalog[key]['images']['imagem2'];
                            }
                            else if (catalog[key]['images']['imagem3'] != null) {
                                img_src = catalog[key]['images']['imagem3'];
                            }
                            else if (catalog[key]['images']['imagem4'] != null) {
                                img_src = catalog[key]['images']['imagem4'];
                            }
                            else if (catalog[key]['images']['default'] != null) {
                                img_src = catalog[key]['images']['default'];
                            }

                            //id do produto
                            var id = catalog[key]['id'];
                            //Nome do produto
                            var product_name = catalog[key]['details']['name'];
                            //categoria do produto
                            var categories = catalog[key]['categories'][0]['name'];
                            //Parcelas do valor do produto
                            var count = catalog[key]['installment']['count'];

                            //Preco original do produto
                            var oldprice = parseFloat(catalog[key]['skus'][0]['properties']['oldPrice']);
                            //Preco com ou sem desconto aplicado
                            var price = parseFloat(catalog[key]['price']);
                            //Calcula o desconto
                            var discount = (((oldprice - price) / ((oldprice + price) / 2)) * 100).toFixed(0);


                            //Gera um vetor com os dados filtrados do catalog.json
                            data.push({
                                id: id,
                                name: product_name,
                                price: price,
                                categories: categories,
                                count: count,
                                oldprice: oldprice,
                                discount: discount,
                                image_src: img_src
                            });
                        }
                    }
                    try {
                        await connection('product').insert(data);
                    } catch (err) {
                        console.log(err);
                    }
                }
            });

        //Função usada para separa o id dos produtos
        function getProductId(obj_array) {
            var array_res = [];
            Object.entries(obj_array).forEach(([key, value]) => {
                array_res.push(obj_array[key]['recommendedProduct']['id']);
            });
            return array_res;
        }

        var dataPrice_id = getProductId(price_id);//Armazena os id dos produtos
        var dataPopular_id = getProductId(popular_id);//Armazena os id dos produtos

        var fields = response_type == 'complete' ? ['name', 'price', 'oldprice', 'count', 'discount', 'image_src'] : '*';
        //query dos produtos populares
        var popular_products = await connection('product').select(fields).whereIn('id', dataPopular_id).limit(maxProducts);
        //query dos produtos com desconto


        var price_products = await connection('product').select(fields).whereIn('id', dataPrice_id).andWhereRaw('price <> oldprice').limit(maxProducts);

        return response.json({ popular_products, price_products })
    },

}
