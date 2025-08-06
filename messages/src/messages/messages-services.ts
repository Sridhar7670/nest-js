import { MessageRepository } from "./messages-repository";
export class MessageServices {
    messageRepository: MessageRepository;

    constructor() {
        //service is creating its own repository 
        // This is not a good practice, as it violates the Dependency Inversion Principle.
        // Ideally, the repository should be injected into the service.
        // However, for simplicity, we are doing it this way.
        // In a real-world application, you would inject the repository via the constructor.
        // This allows for better testing and flexibility.
        this.messageRepository = new MessageRepository();
    }

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