/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2021/7/7
 * Time: 上午19:28
 */
const models = require('../models/index');
const Model = models.Trace;
const radarTrackParse = require("./radar-track")

Model.findAll({
 // limit: 10
}).then(res => {
  res.forEach(item => {
    console.log(convert(item));
  })
})

function convert(item) {
  // 从十六进制转成utf-8
  // Buffer.from(str, 'hex').toString('utf-8')
  // console.log( JSON.stringify(radarTrackParse(item.hex), (key, value) =>
  //        key === 'TraceTimeStamp' ? undefined : value
  //    ),
  // )

  Model.update({
    // 使用stringify的第二个参数过滤掉TraceTimeStamp字段
    json: JSON.stringify(radarTrackParse(item.hex), (key, value) =>
      key === 'TraceTimeStamp' ? undefined : value
    ).toString(),
  }, {
    where: {
      id: item.id
    }
  }).then(function (users) {
  });
}


