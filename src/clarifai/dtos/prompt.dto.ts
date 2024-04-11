import { IsInt, IsOptional, IsString } from "class-validator";

export class PrompDto{
    @IsString()
    readonly prompt:string

    @IsInt()
    @IsOptional()
    readonly maxTokens?:number;
}