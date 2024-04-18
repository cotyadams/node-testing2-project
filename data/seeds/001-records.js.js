/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('records').del()
  await knex('records').insert([
    {record: 'avalon'},
    {record: 'hellrap'},
    {record: 'hexada'}
  ]);
};
