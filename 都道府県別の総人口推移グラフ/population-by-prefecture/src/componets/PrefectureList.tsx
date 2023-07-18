import React, { useState, useEffect } from 'react';
import './PrefectureList.css';
import PopulationGraph from './PopulationGraph';

type Prefecture = {
  prefCode: string;
  prefName: string;
};

interface PopulationData {
  year: number;
  data: {
    label: string;
    data: {
      label: string;
      value: number;
    }[];
  }[];
}

const PrefectureList: React.FC = () => {
  const [prefectureList, setPrefecture] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<string[]>([]);
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);

  useEffect(() => {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'x-api-key': 't8iDO1SIOxGO6G95JOyAy89MBmuillrmRTzzrjtr' },
    })
      .then((res) => res.json())
      .then((json) => {
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

  useEffect(() => {
    const fetchPopulationData = async () => {
      for (let i = 0; i < selectedPrefectures.length; i++) {
        const code = selectedPrefectures[i];
        fetch(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${code}`,
          {
            headers: {
              'x-api-key': 't8iDO1SIOxGO6G95JOyAy89MBmuillrmRTzzrjtr',
            },
          }
        )
          .then((res) => res.json())
          .then((json) => {
            setPopulationData(json.result);
            console.log(json.result);
          });
        // const data = await response.json();
        // console.log(data.result);

        // setPopulationData(data.result);
      }
    };

    if (selectedPrefectures.length > 0) {
      fetchPopulationData();
    }
  }, [selectedPrefectures]);

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
      <div>
        <PopulationGraph />
      </div>
    </div>
  );
};

export default PrefectureList;
