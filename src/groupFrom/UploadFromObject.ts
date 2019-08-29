import {FileData, SettingsInterface, UploadcareFileInterface, UploadcareGroupInterface} from '../types'
import {UploadFrom} from './UploadFrom'
import group from '../api/group'
import CancelError from '../errors/CancelError'
import fileFrom from '../fileFrom/fileFrom'
import {GroupInfoInterface} from '../api/types'
import {UploadInterface} from '../lifecycle/types'
import {FileFromEnum} from '..'

export class UploadFromObject extends UploadFrom {
  protected readonly promise: Promise<UploadcareGroupInterface>

  private readonly data: FileData[]
  private readonly settings: SettingsInterface
  private readonly uploads: UploadInterface<UploadcareFileInterface>[]
  private readonly files: Promise<UploadcareFileInterface[]>

  constructor(data: FileData[], settings: SettingsInterface) {
    super()

    this.data = data
    this.settings = settings

    this.uploads = this.getUploadsPromises()
    this.files = this.getFilesPromise()
    this.promise = this.getGroupPromise()
  }

  private getUploadsPromises = (): UploadInterface<UploadcareFileInterface>[] => {
    const filesTotalCount = this.data.length

    return this.data.map((file: FileData, index: number) => {
      const fileUpload = fileFrom(FileFromEnum.Object, file, this.settings)
      const fileNumber = index + 1

      fileUpload.onCancel = this.handleCancelling

      fileUpload.onUploaded = ((): void => {
        this.handleUploading({
          total: filesTotalCount,
          loaded: fileNumber
        })
      })

      return fileUpload
    })
  }

  private getFilesPromise = (): Promise<UploadcareFileInterface[]> => {
    return Promise.all(this.uploads)
  }

  private getGroupPromise = (): Promise<UploadcareGroupInterface> => {
    this.handleUploading()

    return this.getFilesPromise()
      .then(files => {
        const uuids = files.map(file => file.uuid)

        return group(uuids, this.settings)
      })
      .then(this.handleInfoResponse)
      .then(this.handleReady)
      .catch(this.handleError)
  }

  private handleInfoResponse = (groupInfo: GroupInfoInterface): Promise<UploadcareGroupInterface> => {
    if (this.isCancelled) {
      return Promise.reject(new CancelError())
    }

    return this.handleUploaded(groupInfo)
  }

  cancel(): void {
    this.isCancelled = true
  }
}
