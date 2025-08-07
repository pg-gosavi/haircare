export const mockPatients = [
  {
    id: 'p1',
    name: 'John Smith',
    age: 35,
    gender: 'Male',
    phone: '123-456-7890',
    email: 'john.smith@example.com',
    location: 'Nashik',
    lastVisit: '10 Jun 2024',
    registeredDate: '10 Jan 2024',
    notes: 'Patient experiencing gradual hair loss over the past 5 years. No family history of baldness. Has been using over-the-counter minoxidil with limited results. Blood work shows normal thyroid function.',
  },
  {
    id: 'p2',
    name: 'Priya Sharma',
    age: 29,
    gender: 'Female',
    phone: '234-567-8901',
    email: 'priya.sharma@example.com',
    location: 'Pune',
    lastVisit: '12 Jun 2024',
    registeredDate: '15 Feb 2024',
    notes: 'Patient has diffuse thinning across the scalp. Has history of hormonal imbalance. Started on combination therapy with minoxidil and oral supplements.',
  },
  {
    id: 'p3',
    name: 'Raj Patel',
    age: 42,
    gender: 'Male',
    phone: '345-678-9012',
    email: 'raj.patel@example.com',
    location: 'Nashik',
    lastVisit: '8 Jun 2024',
    registeredDate: '5 Mar 2024',
    notes: 'Advanced male pattern baldness. Patient is a good candidate for FUE transplant. Has scheduled procedure for next month.',
  },
  {
    id: 'p4',
    name: 'Ananya Desai',
    age: 33,
    gender: 'Female',
    phone: '456-789-0123',
    email: 'ananya.desai@example.com',
    location: 'Bhusawal',
    lastVisit: '15 Jun 2024',
    registeredDate: '20 Mar 2024',
    notes: 'Post-pregnancy hair loss. Starting on PRP therapy. Has shown good initial response after first session.',
  },
  {
    id: 'p5',
    name: 'Vikram Singh',
    age: 38,
    gender: 'Male',
    phone: '567-890-1234',
    email: 'vikram.singh@example.com',
    location: 'Pune',
    lastVisit: '5 Jun 2024',
    registeredDate: '12 Apr 2024',
    notes: 'Treating receding hairline with combination of medications and PRP therapy. Has completed 2 out of 4 planned PRP sessions.',
  }
];

export const mockTreatments = [
  {
    id: 't1',
    patientId: 'p1',
    date: '10 Jun 2024',
    type: 'PRP Therapy',
    notes: 'Second PRP session completed. Patient reports reduced hair fall. Visible improvement in crown area density. Recommended continuing with current medication regimen.',
    images: [
      { 
        label: 'Front View', 
        url: 'https://images.pexels.com/photos/4047878/pexels-photo-4047878.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      { 
        label: 'Crown View', 
        url: 'https://images.pexels.com/photos/3993331/pexels-photo-3993331.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  },
  {
    id: 't2',
    patientId: 'p1',
    date: '10 May 2024',
    type: 'PRP Therapy',
    notes: 'First PRP session completed. Patient tolerated procedure well. Prescribed topical minoxidil 5% and ketoconazole shampoo. Follow-up scheduled for 1 month.',
    images: [
      { 
        label: 'Front View', 
        url: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      { 
        label: 'Side View', 
        url: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  },
  {
    id: 't3',
    patientId: 'p1',
    date: '10 Apr 2024',
    type: 'Initial Consultation',
    notes: 'Initial assessment completed. Diagnosed with male pattern baldness (Norwood scale III-vertex). Blood work ordered to rule out underlying issues. Discussed treatment options including medication, PRP therapy, and hair transplant.',
    images: [
      { 
        label: 'Front View', 
        url: 'https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      { 
        label: 'Crown View', 
        url: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  },
  {
    id: 't4',
    patientId: 'p2',
    date: '12 Jun 2024',
    type: 'Follow-up',
    notes: 'Patient showing good response to treatment. Hair density improving, especially in frontal region. Continuing current medication regimen.',
    images: [
      { 
        label: 'Front View', 
        url: 'https://images.pexels.com/photos/5444000/pexels-photo-5444000.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      { 
        label: 'Side View', 
        url: 'https://images.pexels.com/photos/3768891/pexels-photo-3768891.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  }
];