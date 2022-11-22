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
        model: 'Honda Hornet',
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

  describe('Testa as rotas do tipo get', function () {
    it('Deve listar todos as motos com sucesso', async function () {
      const motorcycleInput: IMotorcycle[] = [
        {
          _id: '637a3c57ded98fff8aa8bd43',
          model: 'Honda',
          year: 2005,
          color: 'Yellow',
          status: true,
          buyValue: 30.000,
          category: 'Street',
          engineCapacity: 600,
        },
        {
          _id: '637a3c57ded98fff8aa8bd44',
          model: 'Honda Cbr 1000rr',
          year: 2011,
          color: 'Orange',
          status: true,
          buyValue: 59.900,
          category: 'Street',
          engineCapacity: 1000,
        },
      ];
      const motorcycleOutput: Motorcycle[] = motorcycleInput
        .map((motorcycle: IMotorcycle) => new Motorcycle(motorcycle));
      sinon.stub(Model, 'find').resolves(motorcycleInput);

      const service = new MotorcycleService();
      const result = await service.findAll();

      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it('Deve listar a moto de um id específico com sucesso', async function () {
      const motorcycleInput: IMotorcycle = {
        _id: '637a3c57ded98fff8aa8bd43',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      };
      const motorcycleOutput: Motorcycle = new Motorcycle({ ...motorcycleInput });
      sinon.stub(Model, 'findOne').resolves(motorcycleInput);

      const service = new MotorcycleService();
      const result = await service.findById('637a3c57ded98fff8aa8bd43');

      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it('Deve retornar um erro caso o id informado seja inválido', async function () {
      sinon.stub(Model, 'findOne').resolves();
      try {
        const service = new MotorcycleService();
        await service.findById('xxxxxx');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    });

    it('Deve retornar um erro caso o id informado não seja encontrado', async function () {
      sinon.stub(Model, 'findOne').resolves();
      try {
        const service = new MotorcycleService();
        await service.findById('637a3c57ded98fff8aa8bd00');
      } catch (error) {
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    });

    afterEach(function () {
      sinon.restore();
    });
  });

  describe('Testa s rotas do tipo put', function () {
    it('Deve atualizar a moto de um id específico com sucesso', async function () {
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
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.updateById('637a3c57ded98fff8aa8bd43', motorcycleInput);

      expect(result).to.be.deep.equal(motorcycleOutput);

      sinon.restore();
    });
  });
});
