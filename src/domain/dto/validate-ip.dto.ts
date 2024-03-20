import { ApiProperty } from "@nestjs/swagger";


export class ValidateIpDto {

    @ApiProperty({description: 'IP to validate', example: '1.1.1.1'})
    ip: string;
    
}