import defaultSettings from './defaultSettings'
import UploadAPI from './api/index'
import fileFrom from './fileFrom/fileFrom'
import groupFrom from './groupFrom/groupFrom'

/* Types */
import {
  FileData,
  SettingsInterface,
  UploadcareFileInterface,
  UploadcareGroupInterface,
  UploadClientInterface
} from './types'
import {Url} from './api/fromUrl'
import {UploadAPIInterface, Uuid} from './api/types'
import {UploadInterface} from './lifecycle/types'

class UploadClient implements UploadClientInterface {
  private settings: SettingsInterface
  readonly api: UploadAPIInterface

  constructor(settings: SettingsInterface = {}) {
    this.settings = {
      ...defaultSettings,
      ...settings,
    }
    this.api = new UploadAPI(this)
  }

  updateSettings(newSettings: SettingsInterface = {}): void {
    const prevSettings = {...this.settings}

    this.settings = {
      ...prevSettings,
      ...newSettings,
    }
  }

  getSettings(): SettingsInterface {
    return this.settings
  }

  fileFrom(data: FileData | Url | Uuid, settings: SettingsInterface = {}): UploadInterface<UploadcareFileInterface> {
    return fileFrom(data, {
      ...this.settings,
      ...settings,
    })
  }

  groupFrom(data: FileData[] | Url[] | Uuid[], settings: SettingsInterface = {}): UploadInterface<UploadcareGroupInterface> {
    return groupFrom(data, {
      ...this.settings,
      ...settings,
    })
  }
}

export default UploadClient
