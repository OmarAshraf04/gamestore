import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { Trash2, PlusCircle, LayoutDashboard, PackagePlus, Pencil, X, Check } from 'lucide-react'
import React from 'react'

const EMPTY_FORM = { title: '', price: '', category: '', description: '', image: '', videoUrl: '', screenshot: '', rating: '' }

function AdminDashboard() {
  const { isAdmin, token } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('manage')
  const [games, setGames] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loadingGames, setLoadingGames] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isAdmin) navigate('/')
  }, [isAdmin, navigate])

  const fetchGames = () => {
    setLoadingGames(true)
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoadingGames(false))
  }

  useEffect(() => {
    fetchGames()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this game?')) return
    setDeletingId(id)
    try {
      await axios.delete(`http://localhost:5000/api/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setGames(prev => prev.filter(g => g._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete game')
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (game) => {
    setEditingId(game._id)
    setEditForm({
      title: game.title,
      price: game.price,
      category: game.category,
      description: game.description,
      image: game.image,
      videoUrl: game.media?.find(m => m.type === 'video')?.url || '',
      screenshot: game.screenshots?.[0] || '',
      rating: game.rating || 0
    })
  }

  const handleSave = async (id) => {
    setSaving(true)
    try {
      await axios.put(`http://localhost:5000/api/games/${id}`, {
        ...editForm,
        price: parseFloat(editForm.price),
        media: editForm.videoUrl ? [{ type: 'video', url: editForm.videoUrl }] : [],
        screenshots: editForm.screenshot ? [editForm.screenshot] : []
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setGames(prev => prev.map(g => g._id === id ? {
        ...g,
        ...editForm,
        price: parseFloat(editForm.price),
        media: editForm.videoUrl ? [{ type: 'video', url: editForm.videoUrl }] : [],
        screenshots: editForm.screenshot ? [editForm.screenshot] : []
      } : g))
      setEditingId(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update game')
    } finally {
      setSaving(false)
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = 'Valid price is required'
    if (!form.category.trim()) errs.category = 'Category is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (!form.image.trim()) errs.image = 'Image URL is required'
    return errs
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return }

    setSubmitting(true)
    setErrorMsg('')
    setSuccessMsg('')
    try {
      await axios.post('http://localhost:5000/api/games', {
        ...form,
        price: parseFloat(form.price),
        media: form.videoUrl ? [{ type: 'video', url: form.videoUrl }] : [],
        screenshots: form.screenshot ? [form.screenshot] : []
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccessMsg(`"${form.title}" added successfully!`)
      setForm(EMPTY_FORM)
      setFormErrors({})
      fetchGames()
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to add game')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAdmin) return null

  return (
    <div className="container my-5">
      <h2 className="mb-1">
        <LayoutDashboard size={22} className="me-2" />
        Admin Dashboard
      </h2>
      <p className="text-muted mb-4">Manage your game store inventory</p>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <LayoutDashboard size={15} className="me-1" />
            Manage Games
            <span className="badge bg-secondary ms-2">{games.length}</span>
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <PackagePlus size={15} className="me-1" />
            Add Game
          </button>
        </li>
      </ul>

      {activeTab === 'manage' && (
        <div>
          {loadingGames ? (
            <p className="text-muted">Loading games...</p>
          ) : games.length === 0 ? (
            <p className="text-muted">No games found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th className="d-none d-md-table-cell">Image</th>
                    <th>Title</th>
                    <th className="d-none d-md-table-cell">Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map(game => (
                    <React.Fragment key={game._id}>
                      <tr>
                        <td className="d-none d-md-table-cell" style={{ width: '70px' }}>
                          <img
                            src={game.image}
                            alt={game.title}
                            style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </td>
                        <td>{game.title}</td>
                        <td className="d-none d-md-table-cell"><span className="badge bg-secondary">{game.category}</span></td>
                        <td className="text-success fw-bold">${game.price}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => editingId === game._id ? setEditingId(null) : handleEdit(game)}
                          >
                            {editingId === game._id
                              ? <><X size={14} className="me-1" />Cancel</>
                              : <><Pencil size={14} className="me-1" />Edit</>
                            }
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(game._id)}
                            disabled={deletingId === game._id}
                          >
                            <Trash2 size={14} className="me-1" />
                            {deletingId === game._id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>

                      {editingId === game._id && (
                        <tr key={`edit-${game._id}`} className="table-light">
                          <td colSpan={5}>
                            <div className="p-2">
                              <div className="row g-2 mb-2">
                                <div className="col-md-4">
                                  <label className="form-label small mb-1">Title</label>
                                  <input
                                    className="form-control form-control-sm"
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="form-label small mb-1">Price ($)</label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    className="form-control form-control-sm"
                                    value={editForm.price}
                                    onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="form-label small mb-1">Category</label>
                                  <select
                                    className="form-select form-select-sm"
                                    value={editForm.category}
                                    onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                  >
                                    <option value="Action">Action</option>
                                    <option value="RPG">RPG</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Sandbox">Sandbox</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Strategy">Strategy</option>
                                    <option value="Adventure">Adventure</option>
                                  </select>
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label small mb-1">Image URL</label>
                                  <input
                                    className="form-control form-control-sm"
                                    value={editForm.image}
                                    onChange={e => setEditForm({ ...editForm, image: e.target.value })}
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label small mb-1">Trailer URL</label>
                                  <input
                                    className="form-control form-control-sm"
                                    value={editForm.videoUrl || ''}
                                    onChange={e => setEditForm({ ...editForm, videoUrl: e.target.value })}
                                    placeholder="https://www.youtube.com/embed/..."
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label className="form-label small mb-1">Screenshot URL</label>
                                  <input
                                    className="form-control form-control-sm"
                                    value={editForm.screenshot || ''}
                                    onChange={e => setEditForm({ ...editForm, screenshot: e.target.value })}
                                    placeholder="https://..."
                                  />
                                </div>
                                <div className="col-md-2">
                                  <label className="form-label small mb-1">Rating</label>
                                  <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    className="form-control form-control-sm"
                                    value={editForm.rating || 0}
                                    onChange={e => setEditForm({ ...editForm, rating: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="mb-2">
                                <label className="form-label small mb-1">Description</label>
                                <textarea
                                  className="form-control form-control-sm"
                                  rows={2}
                                  value={editForm.description}
                                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                />
                              </div>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleSave(game._id)}
                                disabled={saving}
                              >
                                <Check size={14} className="me-1" />
                                {saving ? 'Saving...' : 'Save Changes'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'add' && (
        <div style={{ maxWidth: '550px' }}>
          {successMsg && <div className="alert alert-success">{successMsg}</div>}
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Elden Ring"
              />
              {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Price ($)</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${formErrors.price ? 'is-invalid' : ''}`}
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="e.g. 59.99"
              />
              {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className={`form-select ${formErrors.category ? 'is-invalid' : ''}`}
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select category...</option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
                <option value="Sports">Sports</option>
                <option value="Sandbox">Sandbox</option>
                <option value="Horror">Horror</option>
                <option value="Strategy">Strategy</option>
                <option value="Adventure">Adventure</option>
              </select>
              {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                rows={3}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Short game description..."
              />
              {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                className={`form-control ${formErrors.image ? 'is-invalid' : ''}`}
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
              {formErrors.image && <div className="invalid-feedback">{formErrors.image}</div>}
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-2 rounded"
                  style={{ width: '100%', maxHeight: '160px', objectFit: 'cover' }}
                  onError={e => e.target.style.display = 'none'}
                />
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Trailer URL (YouTube Embed)</label>
              <input
                className="form-control"
                value={form.videoUrl}
                onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/embed/VIDEO_ID"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Screenshot URL</label>
              <input
                className="form-control"
                value={form.screenshot}
                onChange={e => setForm({ ...form, screenshot: e.target.value })}
                placeholder="https://..."
              />
              {form.screenshot && (
                <img
                  src={form.screenshot}
                  alt="Screenshot Preview"
                  className="mt-2 rounded"
                  style={{ width: '100%', maxHeight: '160px', objectFit: 'cover' }}
                  onError={e => e.target.style.display = 'none'}
                />
              )}
            </div>

            <div className="mb-4">
              <label className="form-label">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                className="form-control"
                value={form.rating}
                onChange={e => setForm({ ...form, rating: e.target.value })}
                placeholder="e.g. 4.5"
              />
            </div>

            <button type="submit" className="btn btn-success w-100" disabled={submitting}>
              <PlusCircle size={16} className="me-2" />
              {submitting ? 'Adding...' : 'Add Game'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard