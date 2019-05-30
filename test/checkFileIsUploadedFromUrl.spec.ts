import * as factory from './_fixtureFactory'
import checkFileIsUploadedFromUrl from '../src/checkFileIsUploadedFromUrl'
import {StatusEnum} from '../src/api/fromUrlStatus'
import {Environment, getSettingsForTesting} from './_helpers'

const environment = Environment.Production

describe('checkFileIsUploadedFromUrl', () => {
  const settings = getSettingsForTesting({
    publicKey: factory.publicKey('token'),
  }, environment)

  it('should be resolved if file is uploaded', async() => {
    checkFileIsUploadedFromUrl({
      token: factory.token('valid'),
      settings,
    })
      .then(info => {
        expect(info.status).toBe(StatusEnum.Success)
      })
  })
  it('should be cancelable', (done) => {
    const polling = checkFileIsUploadedFromUrl({
      token: factory.token('valid'),
       settings,
    })

    setTimeout(() => {
      polling.cancel()
    }, 1)

    polling
      .then(() => done.fail())
      .catch((error) => {
        if (error.name === 'CancelError') {
          done()
        } else {
          done.fail(error)
        }
      })
  })
})
