import { ApiProperty } from "@nestjs/swagger";
import { IAddress } from "src/type/address";


export class QueryDto {

    @ApiProperty({description: 'addresses'})
    addresses: IAddress[];

    @ApiProperty({description: 'client ip'})
    client_ip: string;

    @ApiProperty({description: 'create time'})
    created_at: number;

    @ApiProperty({description: 'domain'})
    domain: string;
}
