import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'Sergio',
          email: 'teste@teste.com',
          password: '123456',
          activation_code: 'colocar o codigo para ativar',
          status: 1, 
        },
        {
          username: 'UserOne',
          email: 'userOne@teste.com',
          password: '654321',
          activation_code: 'colocar o codigo para ativar',
          status: 1, 
         },
         {
          username: 'UserTwo',
          email: 'userTwo@teste.com',
          password: 'qwerty',
          activation_code: 'colocar o codigo para ativar',
          status: 1, 
         },
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};