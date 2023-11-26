import React, {useState} from 'react'
import { useSearch } from '../../context/SearchContext'
import { Link } from "react-router-dom"

const sortItems = (json) => {
    const items = json.results
    const categories = [... new Set(items.map(item => item.category_id))]
    const newItems = []
    items.forEach(element => {
        const newItem = {
            id: element.id,
            title: element.title,
            price: {
                currency: element.currency_id,
                amount: element.price,
                decimals: element.price % 1
            },
            picture: element.thumbnail,
            condition: element.condition,
            free_shipping: element.shipping.free_shipping,
        }
        newItems.push(newItem)
    })
    return {
        author: {
            name: 'Nicolás',
            lastname: 'Lagos',
        },
        categories,
        items: newItems
    }
}


const SearchBar = () => {

    const { setSearchResultsGlobal } = useSearch()
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setSearchInput(e.target.value)
    };

    const fetchData = async () => {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/search?q='+searchInput)
        console.log(response)
        const data = await response.json()
        return data
      }

    const onPress = async () => {
        const responseData = await fetchData()
        const algo = sortItems(responseData)
        setSearchResultsGlobal(algo)
    }

    return <div style={{
        backgroundColor: '#fff159',
        height: '60px',
      }}>
        <input
            type="search"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}/>
        <Link to="/itemList">
            <button onClick={onPress}>Search</button>
        </Link>

    </div>

};

export default SearchBar;