const api1Url = 'https://brf-sap-integration-suite-hml-l5ztmvm0.it-cpi008-rt.cfapps.br10.hana.ondemand.com/http/ygg/person_accounts_souk';
const api2Url = 'https://integrationqas.brf-corp.com/RESTAdapter/ygg/person_accounts_souk';

const api1Auth = 'Basic c2ItMTQ4NzNmZWEtMWI2Zi00ZmI4LWEzZmYtYzY0YmU2M2YwNjc2IWI0ODc5fGl0LXJ0LWJyZi1zYXAtaW50ZWdyYXRpb24tc3VpdGUtaG1sLWw1enRtdm0wIWIxMDY6Y2M3OTMxNWMtZGJjZi00ZjQ0LWFhZjctN2NhMmQyMjYzNDk4JC1fakxVNUo0Z3lmUmJvY0RUUmZxUVZWcXQzaFVJZ0I3b3RWZnh3RmllNWM9';
const api2Auth = 'Basic U1JWX1lHRzpQbGF0ODc2N18jJDA5OA==';

const requestData = {
  packageCount: 1,
  packageSize: 1,
  tp_process: 32
};

function compareResponses(response1, response2) {
  const differences = [];

  const compareObjects = (obj1, obj2, path = '') => {
    if (typeof obj1 !== typeof obj2) {
      differences.push({
        path,
        type: 'Type mismatch',
        value1: typeof obj1,
        value2: typeof obj2
      });
    } else if (typeof obj1 === 'object' && obj1 !== null) {
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
            value2: 'Present in API 2'
          });
        } else if (!(key in obj2)) {
          differences.push({
            path: newPath,
            type: 'Missing key',
            value1: 'Present in API 1',
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
  };

  const tabSaida1 = response1.body.tabSaida;
  const tabSaida2 = response2.body.tabSaida;

  if (Array.isArray(tabSaida1) && Array.isArray(tabSaida2)) {
    if (tabSaida1.length !== tabSaida2.length) {
      differences.push({
        path: 'tabSaida',
        type: 'Array length mismatch',
        value1: tabSaida1.length,
        value2: tabSaida2.length
      });
    }
    for (let i = 0; i < Math.min(tabSaida1.length, tabSaida2.length); i++) {
      compareObjects(tabSaida1[i], tabSaida2[i], `tabSaida[${i}]`);
    }
  } else {
    compareObjects(tabSaida1, tabSaida2);
  }

  return differences;
}

describe('API Comparison', () => {
  it('should validate and compare the API responses', () => {
    cy.request({
      method: 'POST',
      url: api1Url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': api1Auth
      },
      body: requestData
    }).then(response1 => {
      cy.request({
        method: 'POST',
        url: api2Url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': api2Auth
        },
        body: requestData
      }).then(response2 => {
        const differences = compareResponses(response1, response2);
        if (differences.length > 0) {
          cy.log('Differences:', JSON.stringify(differences, null, 2));
          differences.forEach(diff => {
            cy.log(`Difference found at ${diff.path}: ${diff.type}`);
            cy.log(`API 1: ${diff.value1}`);
            cy.log(`API 2: ${diff.value2}`);
          });
        }
        expect(differences).to.be.empty;
      });
    });
  });
});
