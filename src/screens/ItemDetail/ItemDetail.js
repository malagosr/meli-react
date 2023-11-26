import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
// import './ItemDetail.css'

const sortData = (data) => {
  const newItem = {
    id: data.id,
    title: data.title,
    price: {
        currency: data.currency_id,
        amount: data.price,
        decimals: data.price % 1
    },
    picture: data.pictures[0].secure_url,
    condition: data.condition,
    free_shipping: data.shipping.free_shipping,
  }
  return {
    author: {
        name: 'Nicolás',
        lastname: 'Lagos',
    },
    item: newItem
  }

}

const ItemDetails = () => {
  const { id } = useParams()
  const [newData, setNewData] = useState(null)
  const [description, setDescription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const container = {
    padding: '80px',
    backgroundColor: '#EEEEEE'
  }

  const information = {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
  }

  const img = {
      padding: '20px',
      justifyContent: 'center',
      width: '800px',
  }

  const descriptionStyle = {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
  }

  const titleBuy = {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
  }

  useEffect(() => {
    fetch('https://api.mercadolibre.com/items/' + id)
    .then((response) => response.json())
    .then((data) => {
      const sortedData = sortData(data)
      setNewData(sortedData)
    })
    fetch('https://api.mercadolibre.com/items/' + id + '/description')
    .then((response) => response.json())
    .then((description) => setDescription(description.plain_text))
    setIsLoading(false)
  }, [])

  return (
    <div style={container}>
        {isLoading ? (
        <p></p>
        ) : (
          <div style={information}>
            <div style={img}>
              {newData? <img src={newData.item.picture}/> : null}
              {description? 
              <div style={descriptionStyle}>
                <p>Descripción del producto</p>
                <p>{description}</p>
              </div> : null }
            </div>
            <div style={titleBuy}>
              {newData? 
              <div>
                <p>{ newData.item.condition }</p>
                <p>{ newData.item.title }</p>
                <button>Comprar</button> 
              </div>  : null}
            </div>
          </div>
        )}
    </div>
  )
}


 
export default ItemDetails;