function switchTab(page) {
    window.location.href = page;
}

function populateTable(arr1, arr2, arr3,metrics,clsName) {
    const tableBody = document.querySelector(`#${clsName} tbody`);
    tableBody.innerHTML = "";
    let data1 = calculateMetrics(arr1, 1);
    let data2 = calculateMetrics(arr2, 0);
    let data3 = calculateMetrics(arr3, 0);
    for (let i = 0; i < metrics.length; i++) {
        let value1 = (metrics[i][metrics[i].length-1]=='%') ? `${data1[i]}%` : data1[i];
        let value2 = (metrics[i][metrics[i].length-1]=='%') ? `${data2[i]}%` : data2[i];
        let value3 = (metrics[i][metrics[i].length-1]=='%') ? `${data3[i]}%` : data3[i];
        let row = `<tr>
        <td>${metrics[i]}</td>
        <td>${value1}</td>
        <td>${value2}</td>
        <td>${value3}</td>
        </tr>`;
        tableBody.innerHTML += row;
    }
}

function getInputsAndCalculate(num,metrics,clsName) {
    let last7Days = document.getElementById("last7Days").value.split(",").map(Number);
    let lastWeek = document.getElementById("lastWeek").value.split(",").map(Number);
    let yesterday = document.getElementById("yesterday").value.split(",").map(Number);
    if (last7Days.length !== num || lastWeek.length !== num || yesterday.length !== num) {
        alert(`Please enter ${num} values for each category!`);
        return;
    }
    populateTable(last7Days, lastWeek, yesterday,metrics,clsName);
}

function exportToExcel(productname) {
    let table = document.getElementById(`${productname}`);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, `${productname}`);
    XLSX.writeFile(wb, `${productname}.xlsx`);
}