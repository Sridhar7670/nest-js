import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./messages-repository";

@Injectable()
export class MessageServices {
    // messageRepository: MessageRepository;

    // constructor() {
    //     //service is creating its own repository 
    //     // This is not a good practice, as it violates the Dependency Inversion Principle.
    //     // Ideally, the repository should be injected into the service.
    //     // However, for simplicity, we are doing it this way.
    //     // In a real-world application, you would inject the repository via the constructor.
    //     // This allows for better testing and flexibility.
    //     this.messageRepository = new MessageRepository();
    // }

    constructor(private messageRepository: MessageRepository) {
        // The repository is injected into the service via the constructor.
        // This allows for better testing and flexibility.
        // In a real-world application, you would use a dependency injection framework to manage this.
    }

    // The methods below are just wrappers around the repository methods.
    // They can be used to add additional business logic in the future if needed.

    async findOne(id:string){
        return this.messageRepository.findOne(id)
    }
    async findAll(){
        return this.messageRepository.findAll()
    }
    async create(message:any){
        return this.messageRepository.create(message)
    }
    async update(id:string, message:any){
        return this.messageRepository.update(id, message)
    }
    async delete(id:string){
        return this.messageRepository.delete(id)
    }
}