import DeliveryNote from '../DeliveryNote/DeliveryNote';
import styles from './DeliveriesGrid.module.css';

export default function DeliveriesGrid({ orders, reload }) {
    orders.sort(function(a , b){
        if(a.delivered && !b.delivered) return 1;
        if(!a.delivered && b.delivered) return -1;
        return 0;
    });
    
    return (
        <div className={styles.listContainer}>
        <div className={styles.gridList}>
            {orders.map((order) => {
                return (
                    <div className={styles.tile} key={order.id}>
                        <DeliveryNote details={order} reload={reload} />
                    </div>
                )
            })}
        </div>
        </div>
    )
}