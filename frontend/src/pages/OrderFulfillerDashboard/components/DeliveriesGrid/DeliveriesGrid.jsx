import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import DeliveryNote from '../DeliveryNote/DeliveryNote';
import Paper from '@material-ui/core/Paper';
import styles from './DeliveriesGrid.module.css';

export default function DeliveriesGrid({ orders }) {

    return (
        <div className={styles.listContainer}>
        <div className={styles.gridList}>
            {orders.map((order) => {
                return (
                    <div className={styles.tile} id={order.id}>
                        <DeliveryNote details={order} />
                    </div>
                )
            })}
        </div>
        </div>
    )
}