// Conexão com o banco de dados
const connection = require('../database/connection');
const catalog = require('../json/catalog.json');


module.exports = {

    async index(request, response) {
        const popular_id = request.body['data_price'];
        const price_id = request.body['data_popular'];
        const maxProducts = request.body['maxProducts'];
        var data = [];

        await connection('product').select('id')
            .then(async (row) => {
                if (row.length == []) {
                    for (var [key, value] of catalog.entries()) {
                       // console.log(catalog[key]['skus'][0]['properties']['oldPrice']);
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

                            data.push({
                                id: catalog[key]['id'],
                                name: catalog[key]['details']['name'],
                                price: catalog[key]['price'],
                                categories: catalog[key]['categories'][0]['name'],
                                count:catalog[key]['installment']['count'],
                                oldprice:catalog[key]['skus'][0]['properties']['oldPrice'],
                                image_src: img_src
                            });
                        }
                    }
                    try{
                        await connection('product').insert(data);
                    }catch(err){   
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

        var popular_products = await connection('product').select('*').whereIn('id', dataPopular_id).limit(maxProducts);
        var price_products = await connection('product').select('*').whereIn('id', dataPrice_id).limit(maxProducts);
        return response.json({ popular_products, price_products })
    },

}
