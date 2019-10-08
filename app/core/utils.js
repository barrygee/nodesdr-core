function findPatternInString(regex_pattern, string) {

  if (regex_pattern && string) {
      var output_list = [];
      while (true) {
          var a_match = regex_pattern.exec(string);
          if (a_match) {
              // store the match data
              output_list.push(a_match[1]);
          }
          else {
              break;
          }
      }

      return output_list.length === 0 ? new Error(status.NO_MATCHES_FOUND) : output_list

  } else {
      return new Error('regex_pattern and string are required')
  }
}

function convertArrayToJSON(keys, array) {

  let values = {}

  if (keys && array) {

      if (array.length > 0) {

          // loop through the shipping movement
          array.forEach((arr, j) => { 

              let obj = {}
              // build a key/value pair for each array shipping movement item
              arr.forEach((value, i) => {
                  obj[keys[i]] = value
              })

              // add ship JSON object to ships JSON object
              values[j] = obj
          })
      } else {
          return new Error('Unabled to loop through an empty Array')
      }

      return Object.entries(values).length > 0 ? values : new Error('Values array is empty')

  } else {
      return new Error('Keys and Array are required')
  }
}

function nullOrUndefined(value) {

  if (value === null) {
      return null
  }

  if (value === undefined) {
      return undefined
  }

  return false
}

function isEmptyString(value) {
  return value === '' ? true : false
}

function convertToString(value) {
  const nullUndefined = nullOrUndefined(value)
  return value === nullUndefined ? nullUndefined : value.toString()
}

function convertStringToLowercase(value) {
  const nullUndefined = nullOrUndefined(value)
  return value === nullUndefined ? nullUndefined : String(value).toLowerCase();
}

function convertStringToUppercase(value) {
  const nullUndefined = nullOrUndefined(value)
  return value === nullUndefined ? nullUndefined : String(value).toUpperCase();
}

function convertMillisecondsToHours(milliseconds) {
  if (typeof milliseconds == 'number') {
      return milliseconds / 3600000
  }

  return new Error('milliseconds must be a number')
}

function replaceCharacterOrSpaceWithUnderscore(string) {
  const nullUndefined = nullOrUndefined(string)
  return string === nullUndefined ? nullUndefined : string.replace(/\W/g, "_") // \W = not a word - replace each with _
}

function formatKeys(keys) {
  keys.forEach((key, i) => keys[i] = replaceCharacterOrSpaceWithUnderscore(convertStringToLowercase(key)))

  return keys
}

function sanitizeJSONObject(values) {

for(let key of Object.keys(values)) {
  values[key] = sanitizeString(convertToString(values[key]))
}

return values

  // deconstruct object and sanitize each value
  // object = {
  //     port: sanitizeString(convertToString(params.port)),
  //     status: sanitizeString(convertToString(params.status))
  // }

  // return object
}

function sanitizeString(string) {
  // allow case insensitive, alpha numeric, spaces, dashes
  const nullUndefined = nullOrUndefined(string)
  return string === nullUndefined ? nullUndefined : string.replace(/[^a-z0-9 -]/gi, '')
}

function replaceLineBreaksWithSpace(string) {
  return string.replace(/\n|\r/g, ` `)
}

function convertHexToBinary(hex) {
  if(hex) {
      switch (hex.toLowerCase()) {
          case '0':
              return '0000'
          case '1':
              return '0001'
          case '2':
              return '0010'
          case '3':
              return '0011'
          case '4':
              return '0100'
          case '5':
              return '0101'
          case '6':
              return '0110'
          case '7':
              return '0111'
          case '8':
              return '1000'
          case '9':
              return '1001'
          case 'a':
              return '1010'
          case 'b':
              return '1011'
          case 'c':
              return '1100'
          case 'd':
              return '1101'
          case 'e':
              return '1110'
          case 'f':
              return '1111'
          case '10':
              return '10000'
          case '20':
              return '100000'
          case '40':
              return '1000000'
          case '80':
              return '10000000'
          case '100':
              return '100000000'
          default:
              return null
      }
  } else {
      return null
  }
}

function convertBinaryToHex(binary) {
  if(binary) {
      switch (binary) {
          case '0000':
              return '0'
          case '0001':
              return '1'
          case '0010':
              return '2'
          case '0011':
              return '3'
          case '0100':
              return '4'
          case '0101':
              return '5'
          case '0110':
              return '6'
          case '0111':
              return '7'
          case '1000':
              return '8'
          case '1001':
              return '9'
          case '1010':
              return 'A'
          case '1011':
              return 'B'
          case '1100':
              return 'C'
          case '1101':
              return 'D'
          case '1110':
              return 'E'
          case '1111':
              return 'F'
          case '10000':
              return '10'
          case '100000':
              return '20'
          case '1000000':
              return '40'
          case '10000000':
              return '80'
          case '100000000':
              return '100'
          default:
              return null
      }
  } else {
      return null
  }
}

function convertBinaryToDecimal(binary) {
  // 2 = binary base-2 numeral system i.e only 0 and 1 used
  return parseInt(binary, 2)
}

function getRequest(protocol, url) {

  return new Promise((resolve, reject) => {

      protocol.get(url, resp => {

          let data = '';

          // A chunk of data has been recieved.
          resp.on('data', chunk => {
              data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
              resolve(data)
          });

      }).on("error", err => {
          reject(new Error(`Error:  ${err.message}`))
      })
  })
}

function connectToDataStream(host, port) {

  const net = require('net');

  // creates a new TCP Socket and connects to it
  return client = net.connect(port, host, () => console.log(`client connected to ${host}:${port}`))
}

/*
REVISIT THIS - LOOK INTO CATCHING ERRORS WITH GIT CLONE - IS THERE A BETTER WAY TO CLONE A REPO?
*/
function cloneGitRepository(type, repositoryURL, isCoreModuleOrService) {

  const { exec } = require('child_process')
  const installPath = isCoreModuleOrService ? `./app/core/${type}/` : `./app/${type}/`

  try {
    exec(`cd ${installPath} && 
          git clone ${repositoryURL} &&
          git checkout master &&
          git pull origin master`)
  } catch(error) {
    return new Error(`Error:  ${error.message}`)
  }
}

function httpGet(url) {

const http = require('http');

http.get(url, (resp) => {

  let data = ''

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    return data
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}

module.exports = {
  findPatternInString                   : findPatternInString,
  convertArrayToJSON                    : convertArrayToJSON,
  nullOrUndefined                       : nullOrUndefined,
  isEmptyString                         : isEmptyString,
  convertToString                       : convertToString,
  convertStringToLowercase              : convertStringToLowercase,
  convertStringToUppercase              : convertStringToUppercase,
  convertMillisecondsToHours            : convertMillisecondsToHours,
  replaceCharacterOrSpaceWithUnderscore : replaceCharacterOrSpaceWithUnderscore,
  formatKeys                            : formatKeys,
  sanitizeJSONObject                    : sanitizeJSONObject,
  sanitizeString                        : sanitizeString,
  replaceLineBreaksWithSpace            : replaceLineBreaksWithSpace,
  convertHexToBinary                    : convertHexToBinary,
  convertBinaryToHex                    : convertBinaryToHex,
  convertBinaryToDecimal                : convertBinaryToDecimal,
  getRequest                            : getRequest,
  connectToDataStream                   : connectToDataStream,
  cloneGitRepository                    : cloneGitRepository,
  httpGet                               : httpGet
} 