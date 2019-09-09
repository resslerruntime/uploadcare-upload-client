import {Thenable} from '../thenable/Thenable'

/* Types */
import {UploadcareFileInterface, UploadingProgress} from '../types'
import {CancelableInterface, FileUploadLifecycleInterface, UploadInterface} from '../lifecycle/types'
import {HandlerInterface} from './types'

export class FileUpload extends Thenable<UploadcareFileInterface> implements UploadInterface<UploadcareFileInterface> {
  onProgress: ((progress: UploadingProgress) => void) | null = null
  onUploaded: ((uuid: string) => void) | null = null
  onReady: ((file: UploadcareFileInterface) => void) | null = null
  onCancel: (() => void) | null = null

  protected readonly promise: Promise<UploadcareFileInterface>

  private readonly cancelable: CancelableInterface

  constructor(lifecycle: FileUploadLifecycleInterface, handler: HandlerInterface<UploadcareFileInterface>, cancelable: CancelableInterface) {
    super()
    this.cancelable = cancelable
    const uploadLifecycle = lifecycle.getUploadLifecycle()

    uploadLifecycle.onProgress = this.onProgress
    uploadLifecycle.onUploaded = this.onUploaded
    uploadLifecycle.onReady = this.onReady
    uploadLifecycle.onCancel = this.onCancel

    this.promise = handler.upload()
  }

  /**
   * Cancel uploading.
   */
  cancel(): void {
    this.cancelable.cancel()
  }
}
