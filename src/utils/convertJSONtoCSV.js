// Utility function to flatten nested objects and arrays
const flattenObject = (obj, parent = '', res = {}) => {
   for (let key in obj) {
     const propName = parent ? `${parent}_${key}` : key;
     if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
       flattenObject(obj[key], propName, res);
     } else if (Array.isArray(obj[key])) {
       obj[key].forEach((item, index) => {
         flattenObject(item, `${propName}_${index}`, res);
       });
     } else {
       res[propName] = obj[key];
     }
   }
   return res;
 };
 
 // Utility function to convert JSON data to CSV format
 const convertToCSV = (data) => {
   const flatData = data.map(item => flattenObject(item));
   const csvRows = [];
 
   // Extract headers
   const headers = Object.keys(flatData[0]);
   csvRows.push(headers.join(','));
 
   // Extract rows
   flatData.forEach(row => {
     const values = headers.map(header => {
       const escaped = ('' + row[header]).replace(/"/g, '\\"');
       return `"${escaped}"`;
     });
     csvRows.push(values.join(','));
   });
 
   return csvRows.join('\n');
 };
 
 // Main function to export CSV from JSON data
 export default function exportCSV(json_data) {
   return convertToCSV(json_data);
 }