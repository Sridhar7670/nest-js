import { readFile,writeFile } from "fs/promises";

export class MessageRepository {
    async findOne(id:string){
        // Simulate a database call
        const data = await readFile("messages.json", 'utf-8');
        const messages = JSON.parse(data);
        return messages[id] || null;
    }
    async findAll(){
        // Simulate a database call
        const data = await readFile("messages.json", 'utf-8');
        const messages = JSON.parse(data);
        return messages ;
    }
    // async create(message:any){
    //     // Simulate a database call
    //     const messages = await this.findAll();
    //     // const id=Math.random().toString(36)

    //     // const id=Math.random()*100;
    //     const id=message.id;

    //     messages[id] = {message};
    //     await writeFile("messages.json", JSON.stringify(messages, null, 2));
    //     return { id, ...message };
    // }

    async create(message: any) {
    const messages = await this.findAll();
    const newId = message.id; 
    messages[newId] = { id: newId, Content: message.Content };
    await writeFile("messages.json", JSON.stringify(messages, null, 2));

    return { id: newId, Content: message.Content };
}
    async update(id:string, message:any){
        // Simulate a database call
        const messages = await this.findAll();
        if (!messages[id]) {
            throw new Error("Message not found");
        }
        messages[id] = { id:id, Content: message };
        console.log(messages[id]);
        await writeFile("messages.json", JSON.stringify(messages, null, 2));
        return `${id}: updated successfully`;
       
    }

    async delete(id:string){
        // Simulate a database call
        const messages = await this.findAll();
        if (!messages[id]) {
            throw new Error("Message not found");
        }
        delete messages[id];
        await writeFile("messages.json", JSON.stringify(messages, null, 2));
        return `${id}: deleted successfully`;     
    }
}