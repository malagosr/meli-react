import { Link } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext'


const NumberDisplay = ({ value }) => {
    const formattedNumber = new Intl.NumberFormat('es-ES').format(value);
  
    return <span>$ {formattedNumber}</span>;
  }


const DisplayItem = ({ item }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '20px',
            backgroundColor: '#FFFFFF',
            }}>
            <Link to={`/itemDetails/${item.id}`}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <img src={item.picture} />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '10px',
                    }}>
                        <p style={{
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}><NumberDisplay value={item.price.amount} /></p>
                        <p>{item.title}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

const ItemList = () => {

    const { searchResults } = useSearch()
    return (
        <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '50px',
                backgroundColor: '#EEEEEE',
            }}>
            {searchResults.items?.slice(0, 4).map(item => (
            <DisplayItem item={item} />
            ))}
        </div>
    )   
}

export default ItemList