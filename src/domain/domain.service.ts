import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Domain } from './entities/domain.entity';
import * as dnsPromises from 'node:dns/promises';
import { IAddress } from 'src/type/address';
import { QueryDto } from './dto/query.dto';
import { ValidateIpResponseDto } from './dto/validate-ip-response.dto';

@Injectable()
export class DomainService {
  constructor(@InjectModel('Domain') private domainModel: Model<Domain>) {}

  create(createDomainDto: CreateDomainDto): Promise<Domain> {
    const createdCat = new this.domainModel(createDomainDto);
    return createdCat.save();
  }

  findAll(): Promise<Domain[]> {
    return this.domainModel.find().exec();
  }

  findOne(id: number): Promise<Domain> {
    return this.domainModel.findById(id).exec();
  }

  update(id: number, updateDomainDto: UpdateDomainDto): Promise<Domain> {
    return this.domainModel.findByIdAndUpdate(id, updateDomainDto).exec();
  }

  remove(id: number) {
    return this.domainModel.findByIdAndDelete(id).exec();
  }

  /**
   * retrieve the latest 20 saved queries from the database and display them in order (the most recent should be first).
   */
  async history(): Promise<QueryDto[]> {
    const result = await this.domainModel.find().sort({ _id: -1 }).limit(20).exec();

    const list = result.map((record) => {
      return {
        addresses: record.addresses?.map((address) => ({ ip: address })) as IAddress[],
        client_ip: record.clientIp,
        created_at: record.createdAt.getTime(),
        domain: record.domain,
      } as QueryDto;
    });

    return list;

  }

  async lookupDomain(domain: string, clientIp: string): Promise<QueryDto> {
    const addresses = await dnsPromises.resolve4(domain);
    const domainRecord = new this.domainModel({
      domain,
      clientIp,
      addresses,
    });
    const result = await domainRecord.save();
    return {
      addresses: result.addresses?.map((address) => ({ ip: address })) as IAddress[],
      client_ip: result.clientIp,
      created_at: result.createdAt.getTime(),
      domain: result.domain,
    };
  }

  async validateIp(ip: string) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip,
      )
    ) {
      return {
        status: true,
      } as ValidateIpResponseDto;
    }
    return {
      status: false,
    } as ValidateIpResponseDto;
  }
}
