import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { DomainService } from "./domain.service";
import { ValidateIpDto } from "./dto/validate-ip.dto";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { QueryDto } from "./dto/query.dto";
import { ValidateIpResponseDto } from "./dto/validate-ip-response.dto";


@Controller('v1/tools')
@ApiTags('Tools')
export class ToolsController {

    constructor(private readonly domainService: DomainService) {}

    /**
     * resolve ONLY the IPv4 addresses for the given domain
     * @param domain 
     * @param clientIp 
     * @returns 
     */
    @Get('lookup')
    @ApiParam({ name: 'domain', type: String , description: 'Domain name' })
    @ApiResponse({ status: 200, description: 'OK', type: QueryDto })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    lookup(@Query("domain") domain: string,
        @Headers('x-forwarded-for') clientIp: string): Promise<QueryDto> {
        return this.domainService.lookupDomain(domain, clientIp);
    }


    /**
     * validate if the input is an IPv4 address
     */
    @Post('validate')
    @ApiResponse({ status: 200, description: 'OK' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    validate(@Body() validateIpDto: ValidateIpDto): Promise<ValidateIpResponseDto> {
        return this.domainService.validateIp(validateIpDto.ip);
    }
    
}