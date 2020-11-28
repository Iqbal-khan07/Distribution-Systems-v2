import DeliveryNote from '../DeliveryNote/DeliveryNote';
import styles from './DeliveriesGrid.module.css';

export default function DeliveriesGrid({ orders }) {

    return (
        <div className={styles.listContainer}>
        <div className={styles.gridList}>
            {orders.map((order) => {
                return (
                    <div className={styles.tile} key={order.id}>
                        <DeliveryNote details={order} />
                    </div>
                )
            })}
        </div>
        </div>
    )
}