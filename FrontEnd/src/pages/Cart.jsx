import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    axios.get('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setCart(res.data.data.items || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [token])

  const removeItem = async (gameId) => {
    await axios.delete(`http://localhost:5000/api/cart/${gameId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setCart(cart.filter(item => item.game._id !== gameId))
  }

  const total = cart.reduce((sum, item) => sum + item.game.price * item.quantity, 0)

  if (!token) return (
    <div className="container my-5 text-center">
      <h4>Please <Link to="/login">login</Link> to view your cart</h4>
    </div>
  )

  if (loading) return <p className="text-center mt-5">Loading...</p>
  const placeOrder = async () => {
    try {
      await axios.post('http://localhost:5000/api/orders',
        {
          cartItems: cart.map(item => ({ game: item.game._id, quantity: item.quantity })),
          totalPrice: total
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Remove each item from cart in the database
      await Promise.all(
        cart.map(item =>
          axios.delete(`http://localhost:5000/api/cart/${item.game._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      )

      setCart([])
      alert('Order placed successfully!')
    } catch (err) {
      alert('Something went wrong placing your order')
    }
  }
  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty</p>
          <Link to="/catalog" className="btn btn-success">Browse Games</Link>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.game._id} className="card mb-3">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img src={item.game.image} alt={item.game.title} style={{ width: '80px', borderRadius: '8px' }} />
                  <div>
                    <h5 className="mb-0">{item.game.title}</h5>
                    <p className="text-muted mb-0">{item.game.category}</p>
                    <p className="text-success mb-0">${item.game.price} x {item.quantity}</p>
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => removeItem(item.game._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="text-end">
            <h4>Total: <span className="text-success">${total.toFixed(2)}</span></h4>
            <button className="btn btn-success btn-lg" onClick={placeOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart