const { poll } = require("./dist/uploadcare-upload-client.cjs");

const createPool = time => {
  let _isReady = false;

  setTimeout(() => (_isReady = true), time);

  return () => _isReady;
};

const check = createPool(2500);
const inst = poll(check);

const id = setInterval(() => console.log('    |'), 500)

inst
  .promise
  .then(() => {
    clearInterval(id)
    console.log("    - — poll successfull ends")
  })
  .catch((error) => {
    clearInterval(id)
    console.log(`    x — poll finish with ${error.message}`)
  })

setTimeout(() => {
  console.log('    ^ — cancel event')
  inst.cancel()
}, 1250)

