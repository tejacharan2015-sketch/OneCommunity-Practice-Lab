import React, { useMemo, useState, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { initialResidents, initialRequests, activities } from './data'
import { QRCodeSVG } from 'qrcode.react'


const navItems = [
  ['Overview', '⌂'],
  ['Residents', '♙'],
  ['Requests', '▤'],
  ['Announcements', '◉'],
  ['Gate Scanner', '▣'],
  ['Settings', '⚙']
]

function App() {
  const [page, setPage] = useState('Overview')
  const [residents, setResidents] = useState(initialResidents)
  const [requests, setRequests] = useState(initialRequests)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newUnit, setNewUnit] = useState('')

  const pendingCount = residents.filter(r => r.status === 'Pending').length
  const openCount = requests.filter(r => r.status !== 'Resolved').length

  const filteredResidents = useMemo(() => residents.filter(r => {
    const matchesQuery = `${r.name} ${r.unit} ${r.email}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'All statuses' || r.status === statusFilter
    return matchesQuery && matchesStatus
  }), [residents, query, statusFilter])

  function addResident(event) {
    event.preventDefault()
    if (!newName.trim() || !newUnit.trim()) return
    setResidents([{ id: Date.now(), name: newName, unit: newUnit, email: `${newName.toLowerCase().replaceAll(' ', '.')}@example.com`, status: 'Pending', joined: 'Just now', initials: newName.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase(), color: 'blue' }, ...residents])
    setNewName('')
    setNewUnit('')
    setShowAdd(false)
  }

  function changeRequestStatus(id) {
    setRequests(requests.map(item => item.id === id ? { ...item, status: item.status === 'Open' ? 'In progress' : 'Resolved' } : item))
  }

  function renderContent() {
     if (page === 'Gate Scanner') {
  return <VisitorPassGenerator />
}

    if (page === 'Requests') return <section className="panel table-panel">
      <div className="panel-heading"><div><p className="eyebrow">SERVICE DESK</p><h2>Community requests</h2><p className="muted">Track issues and keep residents updated.</p></div><span className="count-pill">{openCount} open</span></div>
      <div className="request-list">{requests.map(item => <div className="request-row" key={item.id}><div className="request-icon">▤</div><div className="request-main"><div className="request-title">{item.title}</div><div className="muted small">{item.resident} · {item.unit} · {item.date}</div></div><span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span><span className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span><button className="text-btn" onClick={() => changeRequestStatus(item.id)}>{item.status === 'Resolved' ? 'Reopen' : 'Update'}</button></div>)}</div>
    </section>

    if (page === 'Announcements') return <section className="panel empty-panel"><div className="empty-icon">◉</div><h2>Announcements</h2><p className="muted">Your community updates will appear here.</p><button className="primary-btn" onClick={() => alert('Announcement composer is coming soon.')}>＋ New announcement</button></section>
    if (page === 'Settings') return <section className="panel empty-panel"><div className="empty-icon">⚙</div><h2>Workspace settings</h2><p className="muted">Manage your community profile and preferences.</p><div className="settings-card"><span>Community name</span><strong>Commonspace Residences</strong></div><div className="settings-card"><span>Workspace plan</span><strong>Starter · Practice environment</strong></div></section>

    return <><section className="welcome"><div><p className="eyebrow light">FRIDAY, 27 NOVEMBER 2026</p><h1>Your community,<br/>running smoothly.</h1><p className="welcome-sub">Here’s what’s happening across Commonspace today.</p></div><div className="welcome-art"><div className="sun"></div><div className="building b1"></div><div className="building b2"></div><div className="building b3"></div><div className="plant">✳</div></div></section>
      <section className="stats-grid">
        <StatCard label="Total residents" value={residents.length} note="Across all community units" icon="♙" tone="purple"/>
        <StatCard label="Pending approvals" value={pendingCount} note="Applications awaiting review" icon="◷" tone="orange"/>
        <StatCard label="Open requests" value={openCount} note="Need your attention" icon="▤" tone="blue"/>
        <StatCard label="Resolved this month" value="28" note="↑ 12% from last month" icon="✓" tone="green"/>
      </section>
      <section className="dashboard-grid"><div className="panel"><div className="panel-heading"><div><p className="eyebrow">PEOPLE</p><h2>Recent residents</h2></div><button className="link-btn" onClick={() => setPage('Residents')}>View all →</button></div><ResidentsTable residents={residents.slice(0, 4)} compact/></div>
      <div className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">LIVE FEED</p><h2>Recent activity</h2></div><span className="live-dot">LIVE</span></div>{activities.map((a, i) => <div className="activity" key={i}><div className={`activity-icon ${a.tone}`}>{a.icon}</div><div><strong>{a.title}</strong><p className="muted small">{a.detail}</p><p className="time">{a.time}</p></div></div>)}</div></section>
    </>
  }

  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><div><strong>commonspace</strong><small>COMMUNITY OS</small></div></div><div className="workspace"><div className="workspace-avatar">CR</div><div><strong>Commonspace Residences</strong><small>Admin workspace</small></div><span>⌄</span></div><p className="nav-label">WORKSPACE</p><nav>{navItems.map(([name, icon]) => <button key={name} className={`nav-item ${page === name ? 'selected' : ''}`} onClick={() => setPage(name)}><span className="nav-icon">{icon}</span>{name}{name === 'Requests' && <i>{openCount}</i>}</button>)}</nav><div className="sidebar-bottom"><div className="help-card"><div className="help-symbol">✦</div><strong>Need a hand?</strong><p>Explore the practice guide and level up your workflow.</p><button onClick={() => alert('Practice guide: complete the tasks in README.md')}>Open practice guide ↗</button></div><div className="profile"><div className="profile-avatar">AB</div><div><strong>Anup Begari</strong><small>Community admin</small></div><span>•••</span></div></div></aside>
    <main className="main-area"><header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{page}</strong></div><div className="top-actions"><div className="top-search">⌕ <input placeholder="Search anything..." value={query} onChange={e => setQuery(e.target.value)} /></div><button className="icon-btn" aria-label="Notifications">♧<b></b></button><div className="top-avatar">AB</div></div></header><div className="content">{renderContent()}<footer>© 2026 Commonspace <span>Practice environment · Sample data only</span></footer></div></main>
    {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><form className="modal" onSubmit={addResident} onClick={e => e.stopPropagation()}><button type="button" className="close-btn" onClick={() => setShowAdd(false)}>×</button><p className="eyebrow">RESIDENT DIRECTORY</p><h2>Add a resident</h2><p className="muted">Create a resident profile for this community.</p><label>Full name<input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Riya Kapoor"/></label><label>Unit number<input value={newUnit} onChange={e => setNewUnit(e.target.value)} placeholder="e.g. A-305"/></label><div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setShowAdd(false)}>Cancel</button><button className="primary-btn" type="submit">Add resident</button></div></form></div>}
  </div>
}

function StatCard({ label, value, note, icon, tone }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><p>{label}</p><div className="stat-value">{value}</div><small>{note}</small></div>
}

function ResidentsTable({ residents, compact = false }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>RESIDENT</th>
            <th>UNIT</th>
            {!compact && <th>EMAIL</th>}
            <th>STATUS</th>
            {!compact && <th>JOINED</th>}
          </tr>
        </thead>
        <tbody>
          {residents.map(r => (
            <tr key={r.id}>
              <td>
                <div className="person">
                  <div className={`person-avatar ${r.color}`}>{r.initials}</div>
                  <strong>{r.name}</strong>
                </div>
              </td>
              <td>{r.unit}</td>
              {!compact && <td className="muted">{r.email}</td>}
              <td><span className={`status ${r.status.toLowerCase()}`}>{r.status}</span></td>
              {!compact && <td className="muted">{r.joined}</td>}
            </tr>
          ))}
          {residents.length === 0 && (
            <tr>
              <td colSpan={compact ? 3 : 5} className="no-results">
                No residents match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


function VisitorPassGenerator() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [unit, setUnit] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [visitorQR, setVisitorQR] = useState('')

  const [visitors, setVisitors] = useState([])
  const [scannerOpen, setScannerOpen] = useState(false)
  const [scanResult, setScanResult] = useState(null)

  // Generate visitor QR
  function generatePass(event) {
    event.preventDefault()

    if (!name.trim() || !phone.trim() || !unit.trim() || !visitDate) {
      alert('Please fill all visitor details')
      return
    }

    const uniqueToken =
      'VIS-' + Date.now() + '-' +
      Math.random().toString(36).slice(2, 10)

    const visitor = {
      id: uniqueToken,
      name,
      phone,
      unit,
      visitDate,
      entered: false
    }

    setVisitors(prev => [...prev, visitor])
    setVisitorQR(uniqueToken)
  }

  // QR scanner
  useEffect(() => {
    if (!scannerOpen) return

    let scanner

    const timer = setTimeout(() => {
      scanner = new Html5QrcodeScanner(
        'visitor-qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        false
      )

      scanner.render(
        (decodedText) => {
          const visitor = visitors.find(
            item => item.id === decodedText
          )

          if (!visitor) {
            setScanResult({
              status: 'Invalid',
              message: 'Visitor pass not found.',
              visitor: null
            })
          } else {
            const today = [
              new Date().getFullYear(),
              String(new Date().getMonth() + 1).padStart(2, '0'),
              String(new Date().getDate()).padStart(2, '0')
            ].join('-')

            if (visitor.visitDate < today) {
              setScanResult({
                status: 'Expired',
                message: 'Visitor pass has expired.',
                visitor
              })
            } else if (visitor.entered) {
              setScanResult({
                status: 'Already Entered',
                message: 'This visitor has already checked in.',
                visitor
              })
            } else {
              setScanResult({
                status: 'Valid',
                message: 'Visitor pass verified successfully.',
                visitor
              })
            }
          }

          setScannerOpen(false)
        },
        () => {}
      )
    }, 100)

    return () => {
      clearTimeout(timer)

      if (scanner) {
        scanner.clear().catch(console.error)
      }
    }
  }, [scannerOpen, visitors])

  // Approve visitor entry
  function approveEntry() {
    if (!scanResult?.visitor || scanResult.status !== 'Valid') return

    setVisitors(prev =>
      prev.map(visitor =>
        visitor.id === scanResult.visitor.id
          ? { ...visitor, entered: true }
          : visitor
      )
    )

    setScanResult(prev => ({
      ...prev,
      status: 'Entered',
      message: 'Visitor entry successfully recorded.',
      visitor: {
        ...prev.visitor,
        entered: true
      }
    }))
  }

  return (
    <section className="panel visitor-pass-panel">

      {/* VISITOR PASS GENERATOR */}

      <h2>Visitor Pass Generator</h2>

      <p className="muted">
        Register visitors and generate their QR passes.
      </p>

      <form onSubmit={generatePass}>

        <div className="form-group">
          <label>Visitor Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter visitor name"
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Enter mobile number"
            required
          />
        </div>

        <div className="form-group">
          <label>Flat / Unit Number</label>
          <input
            value={unit}
            onChange={e => setUnit(e.target.value)}
            placeholder="Enter flat number"
            required
          />
        </div>

        <div className="form-group">
          <label>Visit Date</label>
          <input
            type="date"
            value={visitDate}
            onChange={e => setVisitDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="primary-btn">
          Generate Visitor QR
        </button>

      </form>

      {/* GENERATED QR */}

      {visitorQR && (
        <div className="visitor-qr">

          <h3>Visitor Pass Generated</h3>

          <QRCodeSVG
            value={visitorQR}
            size={200}
            level="H"
          />

          <p><strong>Name:</strong> {name}</p>
          <p><strong>Mobile:</strong> {phone}</p>
          <p><strong>Unit:</strong> {unit}</p>
          <p><strong>Visit Date:</strong> {visitDate}</p>
          <p><strong>Pass ID:</strong> {visitorQR}</p>

        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      {/* QR SCANNER */}

      <h2>Visitor QR Scanner</h2>

      <p className="muted">
        Scan visitor passes at the security gate.
      </p>

      {!scannerOpen && (
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            setScanResult(null)
            setScannerOpen(true)
          }}
        >
          📷 Start QR Scanner
        </button>
      )}

      {scannerOpen && (
        <div style={{ marginTop: '20px' }}>

          <div
            id="visitor-qr-reader"
            style={{ maxWidth: '450px' }}
          />

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setScannerOpen(false)}
          >
            Stop Scanner
          </button>

        </div>
      )}

      {/* VERIFICATION RESULT */}

      {scanResult && (
        <div
          style={{
            marginTop: '25px',
            padding: '20px',
            borderRadius: '12px',
            background:
              scanResult.status === 'Valid'
                ? '#dcfce7'
                : scanResult.status === 'Entered'
                ? '#dbeafe'
                : '#fee2e2'
          }}
        >

          <h3>
            Verification: {scanResult.status}
          </h3>

          <p>{scanResult.message}</p>

          {scanResult.visitor && (
            <>
              <p><strong>Name:</strong> {scanResult.visitor.name}</p>
              <p><strong>Mobile:</strong> {scanResult.visitor.phone}</p>
              <p><strong>Flat:</strong> {scanResult.visitor.unit}</p>
              <p><strong>Visit Date:</strong> {scanResult.visitor.visitDate}</p>
              <p>
                <strong>Entry Status:</strong>{' '}
                {scanResult.visitor.entered ? 'Entered' : 'Not Entered'}
              </p>
            </>
          )}

          {scanResult.status === 'Valid' && (
            <button
              type="button"
              className="primary-btn"
              onClick={approveEntry}
            >
              Approve Visitor Entry
            </button>
          )}

          <br />

          <button
            type="button"
            className="secondary-btn"
            style={{ marginTop: '15px' }}
            onClick={() => setScanResult(null)}
          >
            Scan Another Visitor
          </button>

        </div>
      )}

      {/* VISITOR RECORDS */}

      <div style={{ marginTop: '35px' }}>

        <h3>Visitor Records</h3>

        {visitors.length === 0 ? (
          <p className="muted">
            No visitor records available.
          </p>
        ) : (

          <div className="table-wrap">

            <table>

              <thead>
                <tr>
                  <th>VISITOR</th>
                  <th>MOBILE</th>
                  <th>UNIT</th>
                  <th>VISIT DATE</th>
                  <th>ENTRY STATUS</th>
                </tr>
              </thead>

              <tbody>
                {visitors.map(visitor => (
                  <tr key={visitor.id}>
                    <td>{visitor.name}</td>
                    <td>{visitor.phone}</td>
                    <td>{visitor.unit}</td>
                    <td>{visitor.visitDate}</td>
                    <td>
                      {visitor.entered ? 'Entered' : 'Not Entered'}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  )
}
export default App