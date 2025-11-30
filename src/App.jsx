import { useState } from 'react';
import styles from './app.module.css';

function App() {
  const [products, setProducts] = useState([]);


  const requestAddPost = () => {

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: 'Новая задача',
        completed: false,
        userId: 1,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, response]);
        console.log('Задача добавлена, ответ сервера:', response);
      });
  };

  return (
    <>
      <h1>Список дел</h1>
      <div className={styles.todoContainer}>
        {/* Показываем список только, если есть задачи */}
        {products.length > 0 ? (
          <ul className={styles.todoList} id="todoList">
            {products.map(({ id, title, completed }) => (
              <li key={id} className={styles.todoListItem}>
                {title} - {completed ? 'Выполнено' : 'Не выполнено'}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>Нет задач. Нажмите "Добавить", чтобы начать.</p>
        )}
        <button className={styles.btn} onClick={requestAddPost}>Добавить</button>
      </div>
    </>
  );
}

export default App;



