import React from 'react';

interface ItemsListProps {
  items: { prefCode: string; prefName: string }[];
}

const PrefectureList: React.FC<ItemsListProps> = (props) => {
  return (
    <div>
      {props.items.map((items) => (
        <div className='aaa' key={items.prefCode}>
          <input type='checkbox' name='' value=''></input>
          <label>{items.prefName}</label>
        </div>
      ))}
    </div>
  );
};

export default PrefectureList;
