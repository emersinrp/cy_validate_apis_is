const apiIsUrl = 'https://brf-sap-integration-suite-hml-l5ztmvm0.it-cpi008-rt.cfapps.br10.hana.ondemand.com/http/ygg/person_accounts_souk';
const apiPoUrl = 'https://integrationqas.brf-corp.com/RESTAdapter/ygg/person_accounts_souk';

const apiIsAuth = 'Basic c2ItMTQ4NzNmZWEtMWI2Zi00ZmI4LWEzZmYtYzY0YmU2M2YwNjc2IWI0ODc5fGl0LXJ0LWJyZi1zYXAtaW50ZWdyYXRpb24tc3VpdGUtaG1sLWw1enRtdm0wIWIxMDY6Y2M3OTMxNWMtZGJjZi00ZjQ0LWFhZjctN2NhMmQyMjYzNDk4JC1fakxVNUo0Z3lmUmJvY0RUUmZxUVZWcXQzaFVJZ0I3b3RWZnh3RmllNWM9';
const apiPoAuth = 'Basic U1JWX1lHRzpQbGF0ODc2N18jJDA5OA==';

const requestData = require('../fixtures/requestDataPersonAccountsSoukHelpers.json');

function compareResponses(response1, response2) {
  const differences = [];

  const compareObjects = (obj1, obj2, path = '') => {
    try {
      if (typeof obj1 !== typeof obj2) {
        differences.push({
          path,
          type: 'Type mismatch',
          value1: typeof obj1,
          value2: typeof obj2
        });
      } else if (obj1 && typeof obj1 === 'object') {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        const allKeys = new Set([...keys1, ...keys2]);

        allKeys.forEach(key => {
          const newPath = path ? `${path}.${key}` : key;
          if (!(key in obj1)) {
            differences.push({
              path: newPath,
              type: 'Missing key',
              value1: 'Key not present',
              value2: 'Present in API PO'
            });
          } else if (!(key in obj2)) {
            differences.push({
              path: newPath,
              type: 'Missing key',
              value1: 'Present in API IS',
              value2: 'Key not present'
            });
          } else {
            compareObjects(obj1[key], obj2[key], newPath);
          }
        });
      } else if (obj1 !== obj2) {
        differences.push({
          path,
          type: 'Value mismatch',
          value1: obj1,
          value2: obj2
        });
      }
    } catch (error) {
      differences.push({
        path,
        type: 'Error during comparison',
        error: error.message
      });
    }
  };

  compareObjects(response1.body, response2.body);

  return differences;
}

module.exports = {
  apiIsUrl,
  apiPoUrl,
  apiIsAuth,
  apiPoAuth,
  requestData,
  compareResponses
};
