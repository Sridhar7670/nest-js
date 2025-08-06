import {  IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";
import {Contains,Length,IsEmail, IsFQDN,Min,Max,} from 'class-validator';

export class createDtoMessage {
    //ADD VALIDATION RULES
    @IsString()
    @IsNotEmpty()
    Content:string;  //case senistive 

    @IsInt()
    @IsNotEmpty()
    id:number; //case sensitive
   
}
export class createMessageDtoNumber {
    @IsInt()
    @IsNotEmpty()
    UserId:number; //case sensitive
    
}


export class PostDto {
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
//   @IsString()
  site: string;

  @IsDateString()
  createDate: Date;
}
