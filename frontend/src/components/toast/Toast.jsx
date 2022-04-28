import { useCallback, useEffect} from 'react'
import styles from './toast.scss'

const Toast = ({ toastlist, position, setList }) => {

  const deleteToast = useCallback(ids => {
    const toastListItem = toastlist.filter(e => e.ids !== ids);
    setList(toastListItem);
  }, [toastlist, setList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if(toastlist.length) {
        deleteToast(toastlist[0].ids);
      }
    }, 100000);

    return () => {
      clearInterval(interval);
    }
  }, [toastlist, deleteToast]);

  return (
    <div className={`type__toast`}>
      {
        toastlist.map((toast, i) => (
          <div
            key={i}
            className={`${styles.notification} ${styles.toast} ${styles[position]}`}
            style={{ backgroundColor: toast.backgroundColors }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div>
              <p className={styles.titles}>{toast.titles}</p>
              <p className={styles.descriptions}>{toast.descriptions}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Toast