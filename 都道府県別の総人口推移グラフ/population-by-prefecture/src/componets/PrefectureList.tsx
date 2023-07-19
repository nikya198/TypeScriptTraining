import React, { useState, useEffect } from 'react';
import './PrefectureList.css';
import PopulationGraph from './PopulationGraph';

type Prefecture = {
  prefCode: string;
  prefName: string;
  checked: boolean;
};

interface PopulationData {
  prefCode: string;
  prefName: string;
  data: {
    label: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
}

const PrefectureList: React.FC = () => {
  const [prefectureList, setPrefecture] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [graphType, setGraphType] = useState<number>(0);

  useEffect(() => {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'x-api-key': 't8iDO1SIOxGO6G95JOyAy89MBmuillrmRTzzrjtr' },
    })
      .then((res) => res.json())
      .then((json) => {
        //console.log(json.result);
        setPrefecture(json.result);
      });
  }, []);

  const PrefectureSubmitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    if (selectedPrefectures.includes(targetValue)) {
      setSelectedPrefectures((selectedPref) =>
        selectedPref.filter((p) => p !== targetValue)
      );
    } else {
      setSelectedPrefectures([...selectedPrefectures, targetValue]);
    }
  };
  //console.log(selectedPrefectures);

  useEffect(() => {
    const fetchPopulationData = async () => {
      const fetchData = await Promise.all(
        selectedPrefectures.map((prefCode) =>
          fetch(
            `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
            {
              headers: {
                'x-api-key': 't8iDO1SIOxGO6G95JOyAy89MBmuillrmRTzzrjtr',
              },
            }
          ).then((res) => res.json())
        )
      );

      const newPopulationData: PopulationData[] = fetchData.map(
        (json, index) => ({
          prefCode: selectedPrefectures[index],
          prefName:
            prefectureList?.[+selectedPrefectures[index] - 1].prefName || '',
          data: json.result.data,
        })
      );
      setPopulationData(newPopulationData);
    };

    if (selectedPrefectures.length > 0) {
      fetchPopulationData();
    } else {
      setPopulationData([]);
    }
  }, [selectedPrefectures]);

  console.log(populationData);
  // console.log(populationData.length);

  return (
    <div>
      <div className='inpuArea'>
        {prefectureList.map((prefecture) => (
          <div className='prefCheckbox' key={prefecture.prefCode}>
            <input
              type='checkbox'
              onChange={PrefectureSubmitHandler}
              value={prefecture.prefCode}
            ></input>
            <label>{prefecture.prefName}</label>
          </div>
        ))}
      </div>
      <div></div>
      <div id='container'>
        {populationData.length > 0 && (
          <select
            value={graphType}
            onChange={(e) => setGraphType(Number(e.target.value))}
          >
            <option value={0}>総人口</option>
            <option value={1}>年少人口</option>
            <option value={2}>生産年齢人口</option>
            <option value={3}>老年人口</option>
          </select>
        )}
        {populationData.length > 0 && (
          <PopulationGraph data={populationData} graphType={graphType} />
        )}
      </div>
    </div>
  );
};

export default PrefectureList;
