/**
 *  @author Finley Ma <maf@shinetechsoftware.com>
 */

/**
 * Document: https://docs.qingcloud.com/qingstor/sdk/js/
 *  @author Finley Ma <maf@shinetechsoftware.com>
 */

module.exports = {
    listObjectsOfBucket
};

function init(env) {
    let QingStor = require('qingstor-sdk').QingStor;
    let Config = require('qingstor-sdk').Config;
    let userConfig = new Config().loadDefaultConfig();
    userConfig.access_key_id = env.access_id;
    userConfig.secret_access_key = env.access_key;

    return new QingStor(userConfig);
}

/**
 * 上传文件到指定Bucket
 * @param service
 * @param path
 * @param uploadFile
 */
function uploadObject(path, uploadFile) {
    // TODO
    const env = require('../env.js').qingstor;
    let service = init(env);
    let bucket = service.Bucket(env.bucket_name, env.location);

    return new Promise((resolve, reject) => {
        bucket.putObject(
            path,
            {
                body: require('fs').readFileSync(uploadFile),
            },
            (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            }
        );
    });
}

/**
 * 列出所有bucket,暂时用不上
 * @param service
 */
function listBuckets(service) {
    service.listBuckets({ location: LOCATION }, (err, data) => {
        console.log(data.buckets);
    });
}

/**
 * 列出bucket中所有的Object文件
 * @param service
 */
function listObjectsOfBucket(options) {
    const env = require('../env.js').qingstor;
    let service = init(env);
    let bucket = service.Bucket(env.bucket_name, env.location);
    return new Promise((resolve, reject) => {
        bucket.listObjects(options,
            (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

async function listObjectsOfBucket2(options) {
    const env = require('../env.js').qingstor;
    let service = init(env);
    let bucket = service.Bucket(env.bucket_name, env.location);
    return await bucket.listObjects(options);
}