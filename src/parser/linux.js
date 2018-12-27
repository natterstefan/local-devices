/**
 * Parses each row in the arp table into { name, ip, mac } on LINUX.
 *
 * partially inspired by https://github.com/goliatone/arpscan/blob/master/lib/arpscanner.js
 */
module.exports = function parseLinux (row, parseOne) {
  // Ignore unresolved hosts.
  if (row === '' || row.indexOf('incomplete') >= 0) {
    return
  }

  var chunks = row.split(' ').filter(Boolean)
  if (parseOne) {
    return prepareOne(chunks)
  } else {
    return prepareAll(chunks)
  }
}

function prepareOne (chunks) {
  return {
    name: '?', // a hostname is not provided on the raspberry pi (linux)
    ip: chunks[0],
    mac: chunks[2]
  }
}

function prepareAll (chunks) {
  return {
    name: chunks[0],
    ip: chunks[1].match(/\((.*)\)/)[1],
    mac: chunks[3]
  }
}
