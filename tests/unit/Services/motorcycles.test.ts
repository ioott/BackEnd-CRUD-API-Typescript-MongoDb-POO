import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testa a rota motorcycles', function () {
  describe('Testa a rota do tipo post', function () {
    it('Deve criar uma nova moto com sucesso', async function () {
      const motorcycleInput: IMotorcycle = {
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const motorcycleOutput: Motorcycle = new Motorcycle({ ...motorcycleInput });
      sinon.stub(Model, 'create').resolves(motorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);

      expect(result).to.be.deep.equal(motorcycleOutput);

      sinon.restore();
    });
  });

  //   describe('Testa as rotas do tipo get', function () {
  //     it('Deve listar todos os carros com sucesso', async function () {
  //       const carInput: ICar[] = [
  //         {
  //           _id: '637a3c57ded98fff8aa8bd43',
  //           model: 'Carro1',
  //           year: 2002,
  //           color: 'Black',
  //           status: true,
  //           buyValue: 15.990,
  //           doorsQty: 4,
  //           seatsQty: 5,
  //         },
  //         {
  //           _id: '637a3c57ded98fff8aa8bd44',
  //           model: 'Carro2',
  //           year: 2002,
  //           color: 'Black',
  //           status: true,
  //           buyValue: 15.990,
  //           doorsQty: 4,
  //           seatsQty: 5,
  //         },
  //       ];
  //       const carOutput: Car[] = carInput.map((car: ICar) => new Car(car));
  //       sinon.stub(Model, 'find').resolves(carInput);

  //       const service = new CarService();
  //       const result = await service.findAll();

  //       expect(result).to.be.deep.equal(carOutput);
  //     });

  //     it('Deve listar o carro de um id específico com sucesso', async function () {
  //       const carInput: ICar = {
  //         _id: '637a3c57ded98fff8aa8bd43',
  //         model: 'Carro1',
  //         year: 2002,
  //         color: 'Black',
  //         status: true,
  //         buyValue: 15.990,
  //         doorsQty: 4,
  //         seatsQty: 5,
  //       };
  //       const carOutput: Car = new Car({ ...carInput });
  //       sinon.stub(Model, 'findOne').resolves(carInput);

  //       const service = new CarService();
  //       const result = await service.findById('637a3c57ded98fff8aa8bd43');

  //       expect(result).to.be.deep.equal(carOutput);
  //     });

  //     it('Deve retornar um erro caso o id informado seja inválido', async function () {
  //       sinon.stub(Model, 'findOne').resolves();
  //       try {
  //         const service = new CarService();
  //         await service.findById('xxxxxx');
  //       } catch (error) {
  //         expect((error as Error).message).to.be.equal('Invalid mongo id');
  //       }
  //     });

  //     it('Deve retornar um erro caso o id informado não seja encontrado', async function () {
  //       sinon.stub(Model, 'findOne').resolves();
  //       try {
  //         const service = new CarService();
  //         await service.findById('637a3c57ded98fff8aa8bd00');
  //       } catch (error) {
  //         expect((error as Error).message).to.be.equal('Car not found');
  //       }
  //     });

  //     afterEach(function () {
  //       sinon.restore();
  //     });
  //   });

  //   describe('Testa s rots do tipo put', function () {
  //     it('Deve atualizar o carro de um id específico com sucesso', async function () {
  //       const carInput: ICar = {
  //         model: 'Carro1',
  //         year: 2002,
  //         color: 'White',
  //         status: true,
  //         buyValue: 15.990,
  //         doorsQty: 4,
  //         seatsQty: 5,
  //       };
  //       const carOutput: Car = new Car({ ...carInput });
  //       sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

  //       const service = new CarService();
  //       const result = await service.updateById('637a3c57ded98fff8aa8bd43', carInput);

  //       expect(result).to.be.deep.equal(carOutput);

//       sinon.restore();
//     });
//   });
});
