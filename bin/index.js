#!/usr/bin/env node

const yargs = require('yargs');
const zmqJsonRpcClient = require('zmq-json-rpc-client');
const util = require('util');
const fs = require('fs');
const path = require('path');

const options = yargs
  .option('endpoint', { alias: 'e', describe: 'Zmq json rpc server endpoint or tcp port on localhost', type: 'string', demandOption: true })
  .option('method', { alias: 'm', describe: 'A String containing the name of the method to be invoked.', type: 'string', demandOption: true })
  .option('params', { alias: 'p', describe: 'A Structured value that holds the parameter values to be used during the invocation of the method. This member MAY be omitted.', type: 'string', demandOption: false })
  .option('file', { alias: 'f', describe: 'Path to json file that holds the parameter values to be used during invocation. This MAY be omitted', type: 'string', demandOption: false })
  .option('id', { alias: 'i', describe: 'An identifier established by the Client that MUST contain a String, Number, or NULL value if included. If it is not included it is assumed to be a notification.', type: 'sting', demandOption: false })
  .option('timeout', { alias: 't', describe: 'Request timeout in ms. Defaults to 30000 ms', type: 'number', demandOption: false })
  .argv;

const endpoint = /^[0-9]+$/.test(options.endpoint) ? `tcp://127.0.0.1:${options.endpoint}` : options.endpoint;

const client = zmqJsonRpcClient(endpoint, {
  nextId: () => options.id,
  timeout: options.timeout,
});

const callback = typeof options.id === 'undefined' ? undefined : (err, result) => {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  console.log(util.inspect(result, false, null, true));
  process.exit(0);
};

let params;

if (options.params) {
  params = JSON.parse(options.params);
}

if (options.file) {
  const filePath = path.isAbsolute(options.file) ? options.file : path.join(process.cwd(), options.file);
  const raw = fs.readFileSync(filePath);
  const json = JSON.parse(raw);

  params = {
    ...params,
    ...json,
  }
}

client.emit(options.method, params, callback);


