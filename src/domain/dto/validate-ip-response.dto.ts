import { ApiProperty } from "@nestjs/swagger";

export class ValidateIpResponseDto {

    @ApiProperty({description: 'IP validation status', example: true})
    status: boolean;
    
}