import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userController } from './users.controller';


describe('AppController', () => {
  let UserController: userController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [userController],
      providers: [UsersService],
    }).compile();

    UserController = module.get<userController>(userController);
  });

  it('should be defined',()=>{
    expect(UserController).toBeDefined();
  })
});
