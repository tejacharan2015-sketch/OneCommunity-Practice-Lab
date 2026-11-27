export const initialResidents = [
  { id: 1, name: 'Aarav Mehta', unit: 'A-204', email: 'aarav@example.com', status: 'Active', joined: '12 Nov 2026', initials: 'AM', color: 'lavender' },
  { id: 2, name: 'Diya Sharma', unit: 'B-108', email: 'diya@example.com', status: 'Pending', joined: '18 Nov 2026', initials: 'DS', color: 'peach' },
  { id: 3, name: 'Kabir Rao', unit: 'C-301', email: 'kabir@example.com', status: 'Active', joined: '04 Oct 2026', initials: 'KR', color: 'mint' },
  { id: 4, name: 'Meera Nair', unit: 'A-110', email: 'meera@example.com', status: 'Inactive', joined: '22 Sep 2026', initials: 'MN', color: 'blue' },
  { id: 5, name: 'Ishaan Patel', unit: 'D-402', email: 'ishaan@example.com', status: 'Active', joined: '20 Nov 2026', initials: 'IP', color: 'rose' },
  { id: 6, name: 'Sara Khan', unit: 'B-212', email: 'sara@example.com', status: 'Pending', joined: '25 Nov 2026', initials: 'SK', color: 'gold' }
]

export const initialRequests = [
  { id: 101, title: 'Water leakage near parking', category: 'Maintenance', resident: 'Aarav Mehta', unit: 'A-204', priority: 'High', status: 'Open', date: 'Today, 9:20 AM' },
  { id: 102, title: 'Visitor access for weekend', category: 'Security', resident: 'Diya Sharma', unit: 'B-108', priority: 'Normal', status: 'In progress', date: 'Today, 8:45 AM' },
  { id: 103, title: 'Gym equipment inspection', category: 'Facilities', resident: 'Kabir Rao', unit: 'C-301', priority: 'Normal', status: 'Resolved', date: 'Yesterday' },
  { id: 104, title: 'Streetlight not working', category: 'Maintenance', resident: 'Meera Nair', unit: 'A-110', priority: 'High', status: 'Open', date: 'Yesterday' }
]

export const activities = [
  { icon: '✓', title: 'Monthly maintenance paid', detail: 'Aarav Mehta · Unit A-204', time: '10 min ago', tone: 'green' },
  { icon: '+', title: 'New resident application', detail: 'Sara Khan · Unit B-212', time: '32 min ago', tone: 'purple' },
  { icon: '!', title: 'New maintenance request', detail: 'Meera Nair · Unit A-110', time: '1 hour ago', tone: 'orange' }
]
