// import * as XLSX from 'xlsx'
 
// export const getAcceptedEntriesDataExcel = (data, batchYear) => {
//     if(data.length > 0){
 
//         let columnHeaders = ['SAP','Name','DOB','Contact','Department','Address','From','Date','Class','Message', "Gender"];
 
//         let rows = []
//         rows.push(columnHeaders);
 
//         for (let i = 0; i < data.length; i++) {
//             let eachRow = [];
//             eachRow.push(data[i]['SAP']);
//             eachRow.push(data[i]['Name']);
//             eachRow.push(data[i]['DOB']);
//             eachRow.push(data[i]['Contact']);
//             eachRow.push(data[i]['Department']);
//             eachRow.push(data[i]['Address']);
//             eachRow.push(data[i]['From']);
//             eachRow.push(data[i]['Date']);
//             eachRow.push(data[i]['Class']);
//             eachRow.push(data[i]['Message']);
//             eachRow.push(data[i]['Gender'] ?? "");
//             rows.push(eachRow);
//         }
 
//         var worksheet = XLSX.utils.aoa_to_sheet(rows);
//         const wb = { Sheets: { data: worksheet }, SheetNames: ["data"] };
//         XLSX.writeFile(wb, `acceptedEntries_data.xlsx`)
 
//     }
// }