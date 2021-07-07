/* eslint-disable */

// 后台发过来的雷达轨迹数据

const Parser = require('binary-parser').Parser

module.exports = function radarTrackParse (data) {
  // Build an IP packet header Parser
  const ipHeader = new Parser()
    .endianess('little')
    .uint8('header')
    .uint16('packetLength')
    // .uint16('ID')
    .uint32('BatchNumber')
    .uint16('TrackScore')
    // .uint64be('TrackAzimuth')
    // doublele 是小端  doublebe 是大端
    .doublele('TrackAzimuth')
    .doublele('TrackAzimuth2')
    .doublele('TrackDistance')
    .doublele('TrackSpeed')
    .doublele('TrackSpeedDirection')
    .doublele('TrackSignalToNoise')
    .floatle('TrackLatitude')
    .floatle('TrackLongitude')
    .floatle('TrackHeight')
    .uint64('TraceTimeStamp')
    .uint32('TraceType')
    .uint16('TargetType')
    .uint16('TargetThreatLevel')
    .doublele('WarningTime')

  // Prepare buffer to parse.
  const buf2 = Buffer.from(data, 'hex')
  return ipHeader.parse(buf2)
}
