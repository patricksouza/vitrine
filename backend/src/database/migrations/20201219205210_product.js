exports.up = function(knex) {
    return knex.schema.createTable('product', function (table) {
        table.string('id',100).primary().unique();
        table.string('name');
        table.float('price');
        table.string('categories');
        table.string('count');
        table.float('oldprice');
        table.float('discount');
        table.string('image_src');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
