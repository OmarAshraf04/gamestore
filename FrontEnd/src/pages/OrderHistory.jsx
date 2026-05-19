import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setOrders(res.data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [token])

  if (!token) return (
    <div className="container my-5 text-center">
      <h4>Please <Link to="/login">login</Link> to view your orders</h4>
    </div>
  )

  if (loading) return <p className="text-center mt-5">Loading...</p>

  return (
    <div className="container my-5">
      <h2 className="mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center">
          <p>No orders yet</p>
          <Link to="/catalog" className="btn btn-success">Browse Games</Link>
        </div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card mb-4">
            <div className="card-header d-flex justify-content-between">
              <span>Order ID: {order._id}</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="card-body">
              {order.cartItems.map(item => (
                <div key={item._id} className="d-flex justify-content-between mb-2">
                  <span>{item.game?.title || 'Game'} x {item.quantity}</span>
                  <span className="text-success">${item.game?.price}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong className="text-success">${order.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory