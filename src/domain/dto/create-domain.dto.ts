import { ApiProperty } from "@nestjs/swagger";

export class CreateDomainDto {

    @ApiProperty({description: 'domain', example: 'google.com'})
    domain: string;

    
    clientIp: string;
}
