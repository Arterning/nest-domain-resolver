import { ApiProperty } from "@nestjs/swagger";


export class ValidateIpDto {

    @ApiProperty({description: 'ip', example: '1.1.1.1'})
    ip: string;
    
}