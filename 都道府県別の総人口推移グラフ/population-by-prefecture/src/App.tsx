import React, { useState, useEffect } from 'react';
import PrefectureList from './componets/PrefectureList';

const App: React.FC = () => {
  return (
    <div className='App'>
      <h1>都道府県人口構成グラフ</h1>
      <PrefectureList />
    </div>
  );
};

export default App;
