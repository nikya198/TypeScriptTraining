const onclickAdd = () => {
  const inputText = document.getElementById('add-text').value;
  document.getElementById('add-text').value = '';
  createImcompeleteList(inputText);
};

const createImcompeleteList = (text) => {
  const li = document.createElement('li');

  const div = document.createElement('div');
  div.className = 'list-row';

  const p = document.createElement('p');
  p.className = 'todo-list';
  p.innerText = text;

  const btnDone = document.createElement('button');
  btnDone.innerText = '完了';
  btnDone.addEventListener('click', () => {
    btnDelete.remove();
    btnDone.remove();
    const btnBack = document.createElement('button');
    btnBack.innerText = '戻す';
    btnBack.addEventListener('click', () => {
      btnBack.remove();
      li.appendChild(div);
      div.appendChild(p);
      div.appendChild(btnDone);
      div.appendChild(btnDelete);
      document.getElementById('imcomplete-list').appendChild(li);
    });

    div.appendChild(btnBack);
    document.getElementById('complete-list').appendChild(li);
  });

  const btnDelete = document.createElement('button');
  btnDelete.innerText = '削除';
  btnDelete.addEventListener('click', () => {
    deletFromImcompeleteList(li);
  });

  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(btnDone);
  div.appendChild(btnDelete);

  document.getElementById('imcomplete-list').appendChild(li);
};

const deletFromImcompeleteList = (li) => {
  document.getElementById('imcomplete-list').removeChild(li);
};

document.getElementById('add-button').addEventListener('click', onclickAdd);
