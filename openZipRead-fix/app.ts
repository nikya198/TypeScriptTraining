declare let JSZip: any;
let inputDateValue = "";

//フォルダ名・ファイル名一覧、CSVの中身の保持
class CSVFileReader {
  private folderFileMap: Map<string, string[]>;
  private dataContents: string[][][];
  private static instance: CSVFileReader;

  constructor() {
    this.dataContents = [];
    this.folderFileMap = new Map();
  }

  static getInsance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new CSVFileReader();
    return this.instance;
  }

  private clearData() {
    this.dataContents = [];
    this.folderFileMap = new Map();
  }

  async readCSV(file: File) {
    this.clearData();
    const zip = await JSZip.loadAsync(file);
    await this.getCsvData(zip);
  }

  getDataContents(): string[][][] {
    return this.dataContents.slice();
  }

  getFolderFileMap(): Map<string, string[]> {
    return this.folderFileMap;
  }

  private async getCsvData(zip: any) {
    const promises: string[][][] = [];

    zip.forEach((filePath: string, zipEntry: any) => {
      if (filePath.includes("60days") && filePath.endsWith(".csv")) {
        const fileName = zipEntry.name.replace(/.*\/(.*?)/, "");
        //folderFileMap(ファイル名一覧)の作成
        const lastSlashIndex = zipEntry.name.lastIndexOf("/");
        let folderName: string = zipEntry.name
          .substring(0, lastSlashIndex)
          .replace(/.*\/(.*?)/, "");

        if (folderName === "60days") {
          folderName = "portalLogin";
        } else if (folderName === "scheduler") {
          folderName = "common";
        }
        if (!this.folderFileMap.has(folderName)) {
          this.folderFileMap.set(folderName, []);
        }
        this.folderFileMap.get(folderName)!.push(fileName);

        //dataContent(CSVの中身)の作成
        const data = zip
          .file(zipEntry.name)
          .async("string")
          .then((content: string) =>
            content
              .split("\n")
              .map((line) => line.split(","))
              .filter((a) => {
                if (a.length > 1) {
                  a.unshift(fileName);
                  a.unshift(folderName);
                }

                return a.length > 1;
              })
          );
        promises.push(data);
      }
    });

    const data = await Promise.all(promises);
    this.dataContents = data;
    return data;
  }
}

//ZIP展開の入力を受け付ける
class UIController {
  private fileInput: HTMLInputElement;
  private extractButton: HTMLButtonElement;
  private inputDate: HTMLInputElement;

  constructor() {
    this.fileInput = document.getElementById("fileInput") as HTMLInputElement;
    this.extractButton = document.getElementById(
      "extractButton"
    ) as HTMLButtonElement;
    this.inputDate = document.getElementById("inputDate") as HTMLInputElement;

    this.configure();
  }

  configure() {
    // ファイル入力要素の値が変更されたときのイベントハンドラを追加
    this.fileInput.addEventListener("change", this.handleFileChange.bind(this));
    this.extractButton.addEventListener("click", this.extractFile.bind(this));
  }

  // ファイル入力要素の値が変更されたときの処理
  private handleFileChange(event: Event) {
    const files = this.fileInput.files;
    if (files && files.length > 0) {
      this.extractButton.disabled = false;
    } else {
      this.extractButton.disabled = true;
    }
  }

  private async extractFile() {
    if (this.inputDate.value === "") {
      alert("基準日を選択してください");
    } else {
      inputDateValue = this.inputDate.value;
      const files = this.fileInput.files!;
      const file = files[0];
      await csvFileReader.readCSV(file);
      new CSVDataProcessor();
    }
  }
}

//CSVデータの加工、テーブルの作成
class CSVDataProcessor {
  csvDataList: string[][][];
  fileNameMap: Map<string, string[]>;
  standardDate: Date;
  eightDayAgoDate: Date;
  columnIndex: number;
  eightDayAgoDataList: string[][][];

  constructor() {
    this.csvDataList = csvFileReader.getDataContents();
    this.fileNameMap = csvFileReader.getFolderFileMap();

    this.standardDate = new Date(inputDateValue);
    this.standardDate.setHours(0, 0, 0, 0);
    this.eightDayAgoDate = new Date(this.standardDate);
    this.eightDayAgoDate.setDate(this.standardDate.getDate() - 7);
    this.eightDayAgoDataList = [];

    this.columnIndex = 8;

    this.createEightDateAgoData();
    this.createTable();
    //this.tableFix();
  }

  private createEightDateAgoData() {
    for (const csvData of this.csvDataList) {
      const day8Data = csvData.filter((column) => {
        let csvDate = new Date(column[2]);
        return csvDate >= this.eightDayAgoDate;
      });

      if (day8Data.length === 0) {
        const column0 = csvData[0][0];
        const column1 = csvData[0][1];
        day8Data.push([column0, column1]);
      }
      this.eightDayAgoDataList.push(day8Data);
    }
  }

  private createTable() {
    let preFolderName = "";
    let rowspanCount = 0;

    for (const csvData of this.eightDayAgoDataList) {
      const maxRow = this.getMaxValueRow(csvData, this.columnIndex);

      const tableBody = document.getElementById("table-body")!;
      const row = document.createElement("tr");
      row.id = maxRow[0];

      //フォルダ名が同じ場合、rowspanを設定しtdを作成しない
      const currentFolderName = maxRow[0];
      if (currentFolderName !== preFolderName) {
        rowspanCount = this.fileNameMap.get(currentFolderName)!.length;
        preFolderName = currentFolderName;
      } else {
        rowspanCount--;
      }

      let firstFlg = true;
      for (const cellValue of maxRow) {
        const cell = document.createElement("td");
        cell.textContent = cellValue;

        if (firstFlg) {
          if (
            rowspanCount === this.fileNameMap.get(currentFolderName)!.length
          ) {
            cell.rowSpan = rowspanCount;
            row.appendChild(cell);
          }
          firstFlg = false;
        } else {
          row.appendChild(cell);
        }
      }
      tableBody.appendChild(row);
    }
  }

  private getMaxValueRow(data: string[][], columnIndex: number): string[] {
    let maxValue = 0;
    let maxRow: string[] = [];

    for (const row of data) {
      const value = parseInt(row[columnIndex]);
      if (isNaN(value)) {
        maxRow = row;
        continue;
      }

      if (!isNaN(value) && value > maxValue) {
        const newRow = row.filter((d) => d.length > 0);
        maxValue = value;
        maxRow = newRow;
      }
    }
    return maxRow;
  }

  // private tableFix() {
  //   const fileNameMap = csvFileReader.getFolderFileMap();
  //   const table = document.getElementById("table-body");

  //   let preFolderName = "";
  //   let rowspanCount = 0;

  //   const rows = table!.getElementsByTagName("tr");
  //   for (let i = 0; i < rows.length; i++) {
  //     const currentFolderName = rows[i].id;

  //     if (currentFolderName !== preFolderName) {
  //       rowspanCount = fileNameMap.get(currentFolderName)!.length;
  //       preFolderName = currentFolderName;
  //     } else {
  //       rowspanCount--;
  //     }

  //     if (rowspanCount === fileNameMap.get(currentFolderName)!.length) {
  //       rows[i].getElementsByTagName("td")[0].rowSpan = rowspanCount;
  //     } else {
  //       rows[i].deleteCell(0);
  //     }
  //   }
  // }
}

const csvFileReader = CSVFileReader.getInsance();
new UIController();
