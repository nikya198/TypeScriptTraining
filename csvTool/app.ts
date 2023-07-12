//CSVファイルの読み込みとデータの保持
class CSVFileReader {
  private dataContents: string[][];

  constructor() {
    this.dataContents = [];
  }

  readCSV(file: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      //データの読み込みが正常に完了した時にloadイベントが発生し、ここに設定したコールバック関数が呼び出されます。
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const contents = event.target!.result as string;
        const lines = contents.split("\n");
        const data = lines.map((line) => line.split(","));
        this.dataContents = data;
        resolve();
      };
      //データの読み込みがエラーで失敗した時にerrorイベントが発生し、ここに設定したコールバック関数が呼び出されます。
      reader.onerror = reject;
    });
  }

  getDataContents(): string[][] {
    return this.dataContents;
  }
}

//ファイル選択のイベントを検知し、CSVファイルを読み込んでテーブルを作成
class CSVFileInput {
  private inputElement: HTMLInputElement;
  private buttonElement: HTMLButtonElement;
  private csvFileReader: CSVFileReader;
  private csvFileName: string;

  constructor() {
    this.inputElement = document.getElementById(
      "csvFileInput"
    ) as HTMLInputElement;
    this.buttonElement = document.getElementById(
      "fileSelect"
    ) as HTMLButtonElement;
    this.csvFileReader = new CSVFileReader();
    this.csvFileName = "";

    this.configure();
  }

  configure() {
    this.buttonElement.addEventListener("click", () => {
      if (this.inputElement) {
        this.inputElement.click();
        //bindでこのclassのthisを渡す
        this.inputElement.addEventListener("change", this.getCsv.bind(this));
      }
    });
  }

  private async getCsv(event: Event) {
    event.preventDefault();
    const files = this.inputElement.files!;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.csvFileName = file.name;
      //csvFileReader.readCSVが解決するまで待機する
      //awaitは、asyncの中でのみ使える構文で、指定したPromiseの結果（resolveかrejectか）が分かるまで、次の行の処理の実行を待ってくれます。
      await this.csvFileReader.readCSV(file);
      this.createTable();
    }
  }

  private createTable() {
    const data = this.csvFileReader.getDataContents();
    const columnIndex = 6;
    const rowCount = Math.min(9, data.length); // 最大8行まで処理する
    const rowsToProcess = data.slice(-rowCount); // 下から指定した行数を取得

    const maxRow = this.getMaxValueRow(rowsToProcess, columnIndex);
    const tableBody = document.getElementById("table-body")!;
    const row = document.createElement("tr");
    for (const cellValue of maxRow) {
      const cell = document.createElement("td");
      cell.textContent = cellValue;
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }

  private getMaxValueRow(data: string[][], columnIndex: number): string[] {
    let maxValue = 0;
    let maxRow: string[] = [];

    for (const row of data) {
      const value = parseInt(row[columnIndex]);
      //csv列名はisNaNとなる→parseIntできないため
      if (!isNaN(value) && value > maxValue) {
        const newRow = row.filter((d) => d.length > 0);
        maxValue = value;
        maxRow = newRow;
      }
    }
    if (maxRow) {
      maxRow.unshift(this.csvFileName); // ファイル名を行の先頭に追加
    }

    return maxRow;
  }
}

const csvFileInput = new CSVFileInput();
