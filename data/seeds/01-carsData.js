exports.seed = function(knex) {
    
    return knex('cars').truncate()
      
    .then(function () {
        return knex('cars').insert([
          {
            VIN: '007ASTONMARTIN',
            make: 'Mazda',
            model: '3',
            mileage: 50000,
            transmission: 'automatic',
            titleStatus: 'clean'
          }
        ]);
    });
};