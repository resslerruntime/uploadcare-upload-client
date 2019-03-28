import {TypeEnum, UrlData} from '../api/fromUrl'
import {Settings, UploadcareFile} from '../types'
import fromUrl from '../api/fromUrl'
import fromUrlStatus from '../api/fromUrlStatus'
import {ProgressState} from './UploadFrom'
import {UploadFrom} from './UploadFrom'

export class UploadFromUrl extends UploadFrom {
  protected request: Promise<UploadcareFile>

  readonly data: UrlData
  readonly settings: Settings

  cancel: (() => void)

  constructor(data: UrlData, settings: Settings) {
    super()

    this.data = data
    this.settings = settings
    // TODO: Just reject promise and stop check file on CDN
    this.cancel = function () {}
    this.request = this.getFilePromise()
  }

  private getFilePromise(): Promise<UploadcareFile> {
    const urlPromise = fromUrl(this.data, this.settings)

    this.setProgress(ProgressState.Uploading)

    if (typeof this.onProgress === 'function') {
      this.onProgress(this.getProgress())
    }

    if (typeof this.onCancel === 'function') {
      this.onCancel()
    }

    return urlPromise
      .then(data => {
        const {type} = data

        if (type === TypeEnum.Token) {
          // @ts-ignore
          const {token} = data
          const status = fromUrlStatus(token, this.settings)

          status.then(data => {
            // @ts-ignore
            const {uuid} = data

            return this.handleUploaded(uuid, this.settings)
          })
        } else if (type === TypeEnum.FileInfo) {
          // @ts-ignore
          const {uuid} = data

          return this.handleUploaded(uuid, this.settings)
        }
      })
      .catch(this.handleError)
      .then(this.handleReady)
  }
}
