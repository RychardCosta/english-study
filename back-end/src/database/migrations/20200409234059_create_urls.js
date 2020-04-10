
exports.up = function(knex) {
    return knex.schema.createTable('urls', function(table) {
        table.string('id').primary()
        table.string('url').notNullable()
        table.string('textEn').notNullable()
        table.string('textBR').notNullable()
        
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('urls')
  
};
