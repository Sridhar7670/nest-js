import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(user) // Inject the repository for the User entity
    private usersRepository: Repository<user>,
  ) {}

  findAll(): Promise<user[]> {
    return this.usersRepository.find();  //return array or empty array
  }

   findOne(id: number): Promise<user | null> {
    return this.usersRepository.findOneBy({id });  //finds the value or return null
   
  }
  
  find(email:string):Promise<user|null>{
    return this.usersRepository.findOneBy({email})
  }

  // async create(email: string, password: string,username:string): Promise<user> {
  //   const newUser = this.usersRepository.create({ email, username ,password});
  //   return this.usersRepository.save({email,username,password});  //this would make the hooks not run such as @AfterInsert() and some other
  // }

  async create(email: string, password: string,username:string): Promise<user> {
    const newUser = this.usersRepository.create({ email, username ,password});
    return this.usersRepository.save(newUser);
  }

  async update(id:number,attributes_to_update:Partial<user>) //partial makes the values inside the user optional 
  {
    const user= await this.findOne(id);
    if(!user){
      throw new Error('user not found');
    }

    Object.assign(user,attributes_to_update) //as we gave partial it can update one or ,many at same time

    return this.usersRepository.save(user)
  }
  async remove(id:number){
    const user= await this.findOne(id)

    if(!user){
      throw new Error('user not found || removed earlier')
    }
    return  this.usersRepository.remove(user)
  }
}