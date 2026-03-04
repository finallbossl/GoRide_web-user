import { IsString, IsOptional } from 'class-validator';

export class ChatMessageDto {
    message!: string;

    @IsOptional()
    @IsString()
    userId?: string;
}
