import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import axios from 'axios'

function GameDetails() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [message, setMessage] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [cartStatus, setCartStatus] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/games/${id}`)
      .then(res => setGame(res.data.data))
      .catch(err => console.error(err))
  }, [id])

  // Check if game is already in cart
  useEffect(() => {
    if (!token) return

    Promise.allSettled([
      axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]).then(([cartRes, ordersRes]) => {
      // Check cart
      const cartItems = cartRes.status === 'fulfilled'
        ? cartRes.value.data.data.items || []
        : []

      const inCartAlready = cartItems.some(item => item.game._id === id)

      // Check orders
      const orders = ordersRes.status === 'fulfilled'
        ? ordersRes.value.data.data || []
        : []

      const alreadyBought = orders.some(order =>
        order.cartItems.some(item => item.game === id || item.game?._id === id)
      )

      if (alreadyBought) setCartStatus('owned')
      else if (inCartAlready) setCartStatus('in_cart')
    })
  }, [id, token])

  const addToCart = async () => {
    if (!token) { navigate('/login'); return }
    try {
      await axios.post('http://localhost:5000/api/cart',
        { gameId: game._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Added to cart!')
      setCartStatus('in_cart')
    } catch (err) {
      setMessage('Something went wrong')
    }
  }

  if (!game) return <p className="text-center mt-5">Loading...</p>

  const media = [
    { type: 'image', url: game.image || 'https://placehold.co/800x450' },
    ...(game.media?.filter(m => m.type === 'video') || []),
    ...(game.screenshots?.map(url => ({ type: 'image', url })) || []),
  ]

  const current = media[activeIndex]

  return (
    <div className="container my-5">
      <button className="btn btn-outline-dark mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} className="me-1" /> Back
      </button>

      <div className="row">
        {/* LEFT — Slideshow */}
        <div className="col-md-7">
          <div className="mb-2" style={{ background: '#000', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9' }}>
            {current.type === 'video' ? (
              <iframe
                src={current.url}
                title="trailer"
                width="100%" height="100%"
                style={{ border: 'none', display: 'block' }}
                allowFullScreen
              />
            ) : (
              <img
                src={current.url}
                alt={`media-${activeIndex}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {media.map((item, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: '80px', height: '52px',
                  borderRadius: '6px', overflow: 'hidden',
                  cursor: 'pointer',
                  border: i === activeIndex ? '2px solid #198754' : '2px solid transparent',
                  opacity: i === activeIndex ? 1 : 0.6,
                  transition: 'all 0.2s'
                }}
              >
                {item.type === 'video' ? (
                  <div style={{ background: '#111', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px' }}>
                    ▶
                  </div>
                ) : (
                  <img src={item.url} alt={`thumb-${i}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Game Info */}
        <div className="col-md-5">
          <h1>{game.title}</h1>
          <span className="badge bg-secondary mb-2">{game.category}</span>
          <p>{game.description}</p>
          <h3 className="text-success">${game.price}</h3>
          {message && <div className="alert alert-success py-2">{message}</div>}
          <button
            className={`btn btn-lg w-100 ${cartStatus ? 'btn-secondary' : 'btn-success'}`}
            onClick={addToCart}
            disabled={!!cartStatus}
          >
            {cartStatus === 'owned' ? 'Already Owned' : cartStatus === 'in_cart' ? 'Already in Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameDetails