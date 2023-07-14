import React, { useState, useEffect } from 'react';
import PrefectureList from './componets/PrefectureList';

export interface Prefecture {
  prefCode: string;
  prefName: string;
}

const App: React.FC = () => {
  const [prefectureList, setPre] = useState<Prefecture[]>([]);
  useEffect(() => {
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'x-api-key': '	t8iDO1SIOxGO6G95JOyAy89MBmuillrmRTzzrjtr' },
    })
      .then((res) => res.json())
      .then((json) => {
        setPre(json.result);
      });
  }, []);

  return (
    <div className='App'>
      <PrefectureList items={prefectureList} />
    </div>
  );
};

export default App;
