exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
          table.increments('id');
          table.text('VIN', 50).unique().notNullable();
          table.text('make', 50).notNullable();
          table.text('model', 50).notNullable();
          table.integer('mileage', 7).notNullable();
          table.text('transmission', 50);
          table.text('titleStatus', 50);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  };