const IPFS = require('ipfs')
const node = new IPFS()

t IPFS = require('ipfs')

const node = new IPFS()

series([
  (cb) => node.on('ready', cb),
  (cb) => node.version((err, version) => {
    if (err) { return cb(err) }
    console.log('Version:', version.version)
    cb()
  })
])

// Create the File to add, a file consists of a path + content. More details on
// https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md
(cb) => node.files.add({
  path: 'hello.txt',
  content: Buffer.from('Hello World')
}, (err, filesAdded) => {
  if (err) { return cb(err) }

  // Once the file is added, we get back an object containing the path, the
  // multihash and the sie of the file
  console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)
  fileMultihash = filesAdded[0].hash
  cb()
})

(cb) => node.files.cat(fileMultihash, (err, data) => {
  if (err) { return cb(err) }

  console.log('\nFile content:')
  // print the file to the terminal and then exit the program
  process.stdout.write(data)
})
