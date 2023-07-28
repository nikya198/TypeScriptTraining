function mergeCellsByValue2(tableId: string) {
  const table = document.getElementById(tableId);
  const rows = table!.getElementsByTagName("tr");
  const mergeMap: any = {};

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentCellValue = currentRow.getElementsByTagName("td")[0].innerText;

    if (mergeMap[currentCellValue] === undefined) {
      mergeMap[currentCellValue] = [currentRow];
    } else {
      mergeMap[currentCellValue].push(currentRow);
    }
  }

  console.log(mergeMap);

  for (const key in mergeMap) {
    const rowsToMerge = mergeMap[key];

    if (rowsToMerge.length > 1) {
      const firstRow = rowsToMerge[0];
      firstRow.getElementsByTagName("td")[0].rowSpan = rowsToMerge.length;

      for (let i = 1; i < rowsToMerge.length; i++) {
        const row = rowsToMerge[i];
        row.deleteCell(0);
      }
    }
  }
}
function mergeCellsByValue(tableId: string) {
  const table = document.getElementById(tableId);
  const rows = table!.getElementsByTagName("tr");
  const mergeMap: any = {};

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentCellValue = currentRow.getElementsByTagName("td")[0].innerText;

    if (mergeMap[currentCellValue] === undefined) {
      mergeMap[currentCellValue] = [currentRow];
    } else {
      mergeMap[currentCellValue].push(currentRow);
    }
  }

  console.log(mergeMap);

  for (const key in mergeMap) {
    const rowsToMerge = mergeMap[key];

    if (rowsToMerge.length > 1) {
      const firstRow = rowsToMerge[0];
      firstRow.getElementsByTagName("td")[0].rowSpan = rowsToMerge.length;

      for (let i = 1; i < rowsToMerge.length; i++) {
        const row = rowsToMerge[i];
        row.deleteCell(0);
      }
    }
  }
}
mergeCellsByValue("myTable");
