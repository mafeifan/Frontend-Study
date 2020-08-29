/**
 * Lodash 的 round 函数
 * @param methodName
 * @returns {function(...[*]=)}
 */
function createRound(methodName) {
  const func = Math[methodName]
  return (number, precision) => {
    precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e')
      const value = func(`${pair[0]}e${+pair[1] + precision}`)

      pair = `${value}e`.split('e')
      return +`${pair[0]}e${+pair[1] - precision}`
    }
    return func(number)
  }
}

const round = createRound('round');


/**
 * 根据出发点经纬度+方位角+距离计算到达点经纬度
 * @param lng 经度
 * @param lat 纬度
 * @param brng 方位角 0 - 360, 0向上/北
 * @param dist 距离 米
 * @return {{lng: *, lat: *}}
 */
function getLonAndLat (lng, lat, brng, dist) {
  // 大地坐标系资料WGS-84 长半径a=6378137 短半径b=6356752.3142 扁率f=1/298.2572236
  const a = 6378137
  const b = 6356752.3142
  const f = 1 / 298.257223563

  const lon1 = lng * 1
  const lat1 = lat * 1
  const alpha1 = rad(brng)
  const sinAlpha1 = Math.sin(alpha1)
  const cosAlpha1 = Math.cos(alpha1)

  const tanU1 = (1 - f) * Math.tan(rad(lat1))
  const cosU1 = 1 / Math.sqrt((1 + tanU1 * tanU1)), sinU1 = tanU1 * cosU1
  const sigma1 = Math.atan2(tanU1, cosAlpha1)
  const sinAlpha = cosU1 * sinAlpha1
  const cosSqAlpha = 1 - sinAlpha * sinAlpha
  const uSq = cosSqAlpha * (a * a - b * b) / (b * b)
  const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)))
  const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)))

  let sigma = dist / (b * A), sigmaP = 2 * Math.PI
  let sinSigma, cosSigma, cos2SigmaM
  while (Math.abs(sigma - sigmaP) > 1e-12) {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma)
    sinSigma = Math.sin(sigma)
    cosSigma = Math.cos(sigma)
    const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
      B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)))
    sigmaP = sigma
    sigma = dist / (b * A) + deltaSigma
  }

  const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1
  const lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
    (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp))
  const lambda = Math.atan2(sinSigma * sinAlpha1, cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1)
  const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha))
  const L = lambda - (1 - C) * f * sinAlpha *
    (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)))

  Math.atan2(sinAlpha, -tmp) // final bearing

  return {
    lng: round(lon1 + deg(L), 6),
    lat: round(deg(lat2), 6)
  }
}

function rad (d) {
  return d * Math.PI / 180.0
}

function deg (x) {
  return x * 180 / Math.PI
}

class RadarHelper {
  constructor (ctx, map) {
    this.ctx = ctx
    this.map = map
  }

  /**
   * 雷达数据处理
   * @param radar
   * @return {{pixel: *}}
   */
  setRadarInfo (radar) {
    this.radar = radar
    // 雷达中心坐标点
    this.radarPixel = this.map.pointToPixel(new BMap.Point(this.radar.Longitude, this.radar.Latitude))
    // 雷达上边缘坐标点
    const point = getLonAndLat(this.radar.Longitude, this.radar.Latitude, 0, this.radar.EnableRange)
    const pixel = this.map.pointToPixel(new BMap.Point(point.lng, point.lat))
    // 雷达半径(px)
    this.radarRadius = this.radarPixel.y - pixel.y
    return {
      pixel
    }
  }

  /**
   * 绘制雷达
   * @param radar
   */
  drawRadar (radar) {
    const { pixel } = this.setRadarInfo(radar)

    // 绘制雷达圈
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = 'rgba(0,255,0,0.3)'
    this.ctx.fillStyle = 'rgba(0,0,0,0.2)'
    // 雷达外圈
    this.ctx.beginPath()
    this.ctx.moveTo(this.radarPixel.x, this.radarPixel.y)
    this.ctx.arc(this.radarPixel.x, this.radarPixel.y, this.radarPixel.y - pixel.y, 0, 2 * Math.PI)
    this.ctx.stroke()
    this.ctx.restore()

    const roundCount = Math.floor(this.radar.EnableRange / 1000)
    // 刻度
    const spacePixel = this.radarRadius / roundCount
    // 字体设置
    let font = parseInt(spacePixel / 4)
    if (font < 10) {
      font = 8
    } else if (font > 20) {
      font = 20
    }
    this.ctx.font = font + 'px bold 黑体'
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'bottom'
    this.ctx.fillStyle = 'rgba(0,255,0,1)'
    this.ctx.fillText('0', this.radarPixel.x + 5, this.radarPixel.y - 3)
    this.ctx.fillText(this.radar.EnableRange, this.radarPixel.x + 5, this.radarPixel.y - this.radarRadius - 3)

    // 雷达内圈
    if (roundCount > 0) {
      for (let i = 1; i < roundCount; i++) {
        this.ctx.arc(this.radarPixel.x, this.radarPixel.y, this.radarRadius / roundCount * i, 0, 2 * Math.PI)
        this.ctx.stroke()

        this.ctx.fillText(i * 1000, this.radarPixel.x + 5, this.radarPixel.y - this.radarRadius / roundCount * i - 3)
      }
    }
    this.ctx.fillStyle = 'rgba(0,0,0,0.05)'
    this.ctx.fill()
    this.ctx.closePath()

    // 绘制坐标轴
    // y轴
    this.ctx.strokeStyle = 'rgba(0,255,0,0.8)'
    this.ctx.lineWidth = 2
    this.ctx.beginPath()
    this.ctx.moveTo(this.radarPixel.x, this.radarPixel.y - this.radarRadius)
    this.ctx.lineTo(this.radarPixel.x, this.radarPixel.y + this.radarRadius)
    this.ctx.closePath()
    this.ctx.stroke()

    // x轴
    this.ctx.beginPath()
    this.ctx.moveTo(this.radarPixel.x - this.radarRadius, this.radarPixel.y)
    this.ctx.lineTo(this.radarPixel.x + this.radarRadius, this.radarPixel.y)
    this.ctx.closePath()
    this.ctx.stroke()
  }

  /**
   * 绘制雷达扫描效果
   * @param radar
   * @param iDeg
   */
  drawRadarScanner (radar, iDeg) {
    this.setRadarInfo(radar)
    const startOpa = 0.1 // 初始的透明度
    const endOpa = 0.5 // 结束的透明度
    const sumStep = 8 // 总共渲染次数
    const opaStep = (endOpa - startOpa) / sumStep // 透明度步进
    for (let i = 0; i < sumStep; i++) {
      const startAngle = (-(sumStep * (1 - i / sumStep)) + iDeg) / 180 * Math.PI
      const endAngle = (-(sumStep * (1 - (i + 1) / sumStep)) + iDeg) / 180 * Math.PI
      this.ctx.fillStyle = 'rgba(0,255,0,' + (startOpa + opaStep * i) + ')'
      this.ctx.beginPath()
      this.ctx.moveTo(this.radarPixel.x, this.radarPixel.y)
      this.ctx.arc(this.radarPixel.x, this.radarPixel.y, this.radarRadius, startAngle, endAngle)
      this.ctx.fill()
      this.ctx.closePath()
    }
  }

  /**
   * 绘制无线电扇形区域效果
   * @param radio
   * @param traces
   */
  drawRadio (radio, traces) {
    if (!traces || !traces.length) {
      return
    }
    const radioPixel = this.map.pointToPixel(new BMap.Point(radio.Longitude, radio.Latitude))
    const range = radio.Range || 5000
    const point = getLonAndLat(radio.Longitude, radio.Latitude, 0, range)
    const pixel = this.map.pointToPixel(new BMap.Point(point.lng, point.lat))
    const radioRadius = radioPixel.y - pixel.y

    this.ctx.globalCompositeOperation = 'xor'
    traces.forEach(trace => {
      const angle = (trace.Azimuth - 90) / 180 * Math.PI
      const itemAngle = Math.PI / 18
      const startAngle = angle - itemAngle
      const endAngle = angle + itemAngle
      this.ctx.beginPath()
      this.ctx.moveTo(radioPixel.x, radioPixel.y)
      this.ctx.arc(radioPixel.x, radioPixel.y, radioRadius, startAngle, endAngle)
      this.ctx.closePath()
      this.ctx.fillStyle = 'rgba(0,255,0,0.1)'
      this.ctx.fill()
    })
    this.ctx.globalCompositeOperation = 'source-over'
  }
}
