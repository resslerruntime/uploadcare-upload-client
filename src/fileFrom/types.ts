import {UploadcareFileInterface} from '../types'
import {UploadInterface} from '../lifecycle/types'

/**
 * Base `thenable` interface for uploading `fileFrom` (`object`, `url`, `input`, `uploaded`).
 */
export interface FileUploadInterface extends UploadInterface<UploadcareFileInterface> {}

export interface HandlerInterface<T> {
  upload(): Promise<T>
}

export interface FileHandlerInterface extends HandlerInterface<UploadcareFileInterface> {}
