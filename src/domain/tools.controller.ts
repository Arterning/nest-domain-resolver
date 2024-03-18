import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { DomainService } from "./domain.service";
import { ValidateIpDto } from "./dto/validate-ip.dto";
import { ApiTags } from "@nestjs/swagger";


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
    lookup(@Query("domain") domain,  @Headers('x-forwarded-for') clientIp: string) {
        return this.domainService.lookupDomain(domain, clientIp);
    }


    /**
     * validate if the input is an IPv4 address
     */
    @Post('validate')
    validate(@Body() validateIpDto: ValidateIpDto) {
        return this.domainService.validateIp(validateIpDto.ip);
    }
    
}