import UploadClient from './UploadClient'

/* Types */
export {SettingsInterface, FileData, OriginalImageInfoInterface, UploadcareFileInterface} from './types'
export {Url} from './api/fromUrl'
export {Uuid, UploadAPIInterface} from './api/types'
export {FileUploadInterface} from './fileFrom/types'
export {UploadClientInterface} from './UploadClient'
export {RequestOptionsInterface, RequestInterface} from './api/request/types'

export {default as poll} from './tools/poll'

export default UploadClient
