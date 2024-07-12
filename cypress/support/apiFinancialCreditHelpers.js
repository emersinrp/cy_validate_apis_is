const apiBaseUrl = 'https://brf-sap-integration-suite-hml-l5ztmvm0.it-cpi008-rt.cfapps.br10.hana.ondemand.com/http/ygg/financial/credit?$skip=0&$format=json';
const apiAuth = 'Basic c2ItMTQ4NzNmZWEtMWI2Zi00ZmI4LWEzZmYtYzY0YmU2M2YwNjc2IWI0ODc5fGl0LXJ0LWJyZi1zYXAtaW50ZWdyYXRpb24tc3VpdGUtaG1sLWw1enRtdm0wIWIxMDY6Y2M3OTMxNWMtZGJjZi00ZjQ0LWFhZjctN2NhMmQyMjYzNDk4JC1fakxVNUo0Z3lmUmJvY0RUUmZxUVZWcXQzaFVJZ0I3b3RWZnh3RmllNWM9';

function getApiUrl(topValue) {
  return `${apiBaseUrl}&$top=${topValue}`;
}

module.exports = {
  getApiUrl,
  apiAuth
};
