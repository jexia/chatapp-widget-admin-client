import { projectID, key, secret } from '../consts/config';
const jexiaSDK = require("jexia-sdk-js/browser");
const rmt = jexiaSDK.realTime();
const dataModule = jexiaSDK.dataOperations();

jexiaSDK.jexiaClient().init({
  projectID: `${projectID}`,
  key: `${key}`,
  secret: `${secret}`
}, dataModule, rmt);

export {
  rmt,
  dataModule,
}
