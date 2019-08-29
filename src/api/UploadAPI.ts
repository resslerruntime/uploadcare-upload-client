import info from './info'
import UploadClient from '../UploadClient'
import fromUrlStatus, {FromUrlStatusResponse} from './fromUrlStatus'
import base, {BaseResponse} from './base'
import {FileInfoInterface, GroupId, GroupInfoInterface, Token, UploadAPIInterface, Uuid} from './types'
import {RequestOptionsInterface, RequestResponse} from './request/types'
import fromUrl, {FromUrlResponse, Url} from './fromUrl'
import groupInfo from './groupInfo'
import {FileData, SettingsInterface} from '../types'
import {prepareOptions} from './request/prepareOptions'
import group from './group'
import request from './request/request'
import {
  MultipartPart, MultipartStartResponse,
} from './multipart/types'
import multipartComplete from './multipart/multipartComplete'
import multipartStart from './multipart/multipartStart'
import multipartUpload from './multipart/multipartUpload'
import {BaseThenableInterface, CancelableThenableInterface} from '../thenable/types'

class UploadAPI implements UploadAPIInterface {
  readonly client: UploadClient

  constructor(client: UploadClient) {
    this.client = client
  }

  private getResultSettings = (settings): SettingsInterface => {
    return {
      ...this.client.getSettings(),
      ...settings,
    }
  }

  request<T>(options: RequestOptionsInterface): Promise<RequestResponse<T>> {
    const preparedOptions = prepareOptions(options, this.client.getSettings())

    return request(preparedOptions)
  }

  base(data: FileData, settings: SettingsInterface = {}): BaseThenableInterface<BaseResponse> {
    return base(data, this.getResultSettings(settings))
  }

  info(uuid: Uuid, settings: SettingsInterface = {}): CancelableThenableInterface<FileInfoInterface> {
    return info(uuid, this.getResultSettings(settings))
  }

  fromUrl(sourceUrl: Url, settings: SettingsInterface = {}): CancelableThenableInterface<FromUrlResponse> {
    return fromUrl(sourceUrl, this.getResultSettings(settings))
  }

  fromUrlStatus(token: Token, settings: SettingsInterface = {}): CancelableThenableInterface<FromUrlStatusResponse> {
    return fromUrlStatus(token, this.getResultSettings(settings))
  }

  group(uuids: Uuid[], settings: SettingsInterface): CancelableThenableInterface<GroupInfoInterface> {
    return group(uuids, this.getResultSettings(settings))
  }

  groupInfo(id: GroupId, settings: SettingsInterface): CancelableThenableInterface<GroupInfoInterface> {
    return groupInfo(id, this.getResultSettings(settings))
  }

  multipartStart(file: FileData, settings: SettingsInterface): CancelableThenableInterface<MultipartStartResponse> {
    return multipartStart(file, this.getResultSettings(settings))
  }

  multipartUpload(file: FileData, parts: MultipartPart[], settings: SettingsInterface): BaseThenableInterface<void> {
    return multipartUpload(file, parts, this.getResultSettings(settings))
  }

  multipartComplete(uuid: Uuid, settings: SettingsInterface): CancelableThenableInterface<FileInfoInterface> {
    return multipartComplete(uuid, this.getResultSettings(settings))
  }
}

export default UploadAPI
