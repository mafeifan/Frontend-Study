/**
 *  @author Finley Ma <maf@shinetechsoftware.com>
 */

const qingstor = require('./lib/qingstor');
const request = require('request');

// 要备份的地址
const BAK_URL = 'https://riot-contents-bak.pek3b.qingstor.com/';

let options = {
    limit: 100,
    // delimiter: '/',
    // prefix: 'merch-images/chibi',
    // marker: 'merch-images/Plush/draven-plush_disabled.png',
    // next_marker: 'chogath_front_1_compressed.png',
    // marker: 'chogath_front_1_compressed.png'
};


digui(options);

function digui(options) {
    qingstor
        .listObjectsOfBucket(options)
        .then(res => {
            if (res.status === 200) {
                mapObject(res);
            }
            // 还有后续，递归调用
            if (res.next_marker) {
                digui({limit: 100, marker: res.next_marker});
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function mapObject(res) {
    const files = res.keys;
    for (let i of files.keys()) {
        // 排除目录，只请求文件
        if (files[i].mime_type !== 'application/x-directory') {
            let url = BAK_URL + files[i].key;
            console.log(url);
            makeRequest(url);
        }
    }
}

function makeRequest(url) {
    return request.get(url);
}
