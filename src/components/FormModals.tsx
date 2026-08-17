import { useState, type ReactNode } from 'react'
import Modal, { SuccessModal } from './Modal'
import { Icon } from './Icons'
import { STUDENTS, CLASSES } from '../data/mockData'
import { useApp } from '../context/AppContext'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
    </div>
  )
}

const STEPS = ['Student', 'Academic', 'Parent', 'Documents', 'Review']

export function StudentRegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useApp()
  const [step, setStep] = useState(0)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '', studentId: 'GVA-2026-011', dob: '', gender: 'Male', nationality: 'United States', address: '',
    academicYear: '2025–2026', className: 'Grade 7', section: 'A', enrollDate: '2026-08-16', previousSchool: '',
    parentName: '', relationship: 'Mother', phone: '', email: '', parentAddress: '',
    birthCert: false, idDoc: false, otherDoc: false,
  })
  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const next = () => {
    if (step === 0 && (!form.firstName || !form.lastName)) {
      toast('warning', 'Some required fields are missing.')
      return
    }
    setStep(s => Math.min(4, s + 1))
  }

  const save = () => {
    setSuccess(true)
    toast('success', 'Student registered successfully.')
  }

  const closeAll = () => { setSuccess(false); setStep(0); onClose() }

  return (
    <>
      <Modal
        open={open && !success}
        onClose={closeAll}
        title="Register New Student"
        size="lg"
        subtitle={`Step ${step + 1} of 5 — ${STEPS[step]}`}
        footer={
          <>
            <button className="btn-secondary" onClick={closeAll}>Cancel</button>
            {step > 0 && <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>Back</button>}
            {step < 4 && <button className="btn-primary" onClick={next}>Next</button>}
            {step === 4 && <button className="btn-primary" onClick={save}>Save Student</button>}
          </>
        }
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 22, overflowX: 'auto' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 90 }}>
              <div className={`step-dot${i === step ? ' active' : i < step ? ' done' : ''}`}>{i < step ? '✓' : i + 1}</div>
              <span style={{ fontSize: 12, fontWeight: i === step ? 700 : 500, color: i === step ? 'var(--text)' : 'var(--text-muted)' }}>{s}</span>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 14, background: 'var(--bg-muted)', padding: 12, borderRadius: 10 }}>
              <div className="avatar" style={{ width: 64, height: 64, fontSize: 20 }}><Icon.Image /></div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Student photo</div>
                <button className="btn-secondary" type="button"><Icon.Upload /> Upload photo</button>
              </div>
            </div>
            <Field label="First Name *"><input className="input-field" value={form.firstName} onChange={e => set('firstName', e.target.value)} /></Field>
            <Field label="Middle Name"><input className="input-field" value={form.middleName} onChange={e => set('middleName', e.target.value)} /></Field>
            <Field label="Last Name *"><input className="input-field" value={form.lastName} onChange={e => set('lastName', e.target.value)} /></Field>
            <Field label="Student ID"><input className="input-field" value={form.studentId} onChange={e => set('studentId', e.target.value)} /></Field>
            <Field label="Date of Birth"><input className="input-field" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} /></Field>
            <Field label="Gender">
              <select className="input-field" value={form.gender} onChange={e => set('gender', e.target.value)}><option>Male</option><option>Female</option></select>
            </Field>
            <Field label="Nationality"><input className="input-field" value={form.nationality} onChange={e => set('nationality', e.target.value)} /></Field>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Address"><input className="input-field" value={form.address} onChange={e => set('address', e.target.value)} /></Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Academic Year"><select className="input-field" value={form.academicYear} onChange={e => set('academicYear', e.target.value)}><option>2025–2026</option><option>2024–2025</option></select></Field>
            <Field label="Class"><select className="input-field" value={form.className} onChange={e => set('className', e.target.value)}>{['Grade 6','Grade 7','Grade 8','Grade 9'].map(c => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Section"><select className="input-field" value={form.section} onChange={e => set('section', e.target.value)}><option>A</option><option>B</option><option>C</option></select></Field>
            <Field label="Enrollment Date"><input className="input-field" type="date" value={form.enrollDate} onChange={e => set('enrollDate', e.target.value)} /></Field>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Previous School"><input className="input-field" value={form.previousSchool} onChange={e => set('previousSchool', e.target.value)} /></Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Parent Name"><input className="input-field" value={form.parentName} onChange={e => set('parentName', e.target.value)} /></Field>
            <Field label="Relationship"><select className="input-field" value={form.relationship} onChange={e => set('relationship', e.target.value)}><option>Mother</option><option>Father</option><option>Guardian</option></select></Field>
            <Field label="Phone"><input className="input-field" value={form.phone} onChange={e => set('phone', e.target.value)} /></Field>
            <Field label="Email"><input className="input-field" value={form.email} onChange={e => set('email', e.target.value)} /></Field>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field label="Address"><input className="input-field" value={form.parentAddress} onChange={e => set('parentAddress', e.target.value)} /></Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['birthCert', 'Birth Certificate'],
              ['idDoc', 'Student ID'],
              ['otherDoc', 'Other Documents'],
            ].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, border: '1px dashed var(--border)', borderRadius: 10 }}>
                <span style={{ fontWeight: 600 }}>{label}</span>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="badge badge-gray">{form[key as 'birthCert'] ? 'Uploaded' : 'No file'}</span>
                  <button type="button" className="btn-secondary" onClick={() => set(key, true)}><Icon.Upload /> Upload</button>
                </span>
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['Name', `${form.firstName} ${form.middleName} ${form.lastName}`.replace(/\s+/g, ' ')],
              ['Student ID', form.studentId],
              ['Date of Birth', form.dob || '—'],
              ['Gender', form.gender],
              ['Class', `${form.className} · ${form.section}`],
              ['Academic Year', form.academicYear],
              ['Parent', form.parentName || '—'],
              ['Phone', form.phone || '—'],
            ].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--bg-muted)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontWeight: 600, marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </Modal>
      <SuccessModal open={success} onClose={closeAll} title="Student registered successfully" message="The student has been added to the school register. You can print the profile or continue registering another student." />
    </>
  )
}

export function TeacherRegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useApp()
  return (
    <Modal open={open} onClose={onClose} title="Add Teacher" size="lg" footer={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={() => { toast('success', 'Teacher added successfully.'); onClose() }}>Save Teacher</button>
      </>
    }>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--bg-muted)', padding: 12, borderRadius: 10, marginBottom: 16 }}>
        <div className="avatar" style={{ width: 56, height: 56 }}><Icon.Image /></div>
        <button className="btn-secondary"><Icon.Upload /> Upload profile photo</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="First Name"><input className="input-field" /></Field>
        <Field label="Last Name"><input className="input-field" /></Field>
        <Field label="Employee ID"><input className="input-field" defaultValue="GVA-T-006" /></Field>
        <Field label="Email"><input className="input-field" type="email" /></Field>
        <Field label="Phone"><input className="input-field" /></Field>
        <Field label="Gender"><select className="input-field"><option>Male</option><option>Female</option></select></Field>
        <Field label="Date of Birth"><input className="input-field" type="date" /></Field>
        <Field label="Joining Date"><input className="input-field" type="date" /></Field>
        <div style={{ gridColumn: '1 / -1' }}><Field label="Address"><input className="input-field" /></Field></div>
        <Field label="Subjects">
          <select className="input-field" multiple style={{ height: 84 }}>
            <option>Mathematics</option><option>English</option><option>Science</option><option>History</option><option>Computer Science</option>
          </select>
        </Field>
        <Field label="Classes">
          <select className="input-field" multiple style={{ height: 84 }}>
            {CLASSES.map(c => <option key={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Qualification"><input className="input-field" placeholder="e.g. M.Sc Mathematics" /></Field>
        <Field label="Status"><select className="input-field"><option>Active</option><option>On Leave</option><option>Inactive</option></select></Field>
      </div>
    </Modal>
  )
}

export function ParentRegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useApp()
  const [kids, setKids] = useState<string[]>([])
  return (
    <Modal open={open} onClose={onClose} title="Add Parent" size="lg" footer={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={() => { toast('success', 'Parent added successfully.'); onClose() }}>Save Parent</button>
      </>
    }>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--bg-muted)', padding: 12, borderRadius: 10, marginBottom: 16 }}>
        <div className="avatar" style={{ width: 56, height: 56 }}><Icon.Image /></div>
        <button className="btn-secondary"><Icon.Upload /> Upload profile photo</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Full Name"><input className="input-field" /></Field>
        <Field label="Relationship"><select className="input-field"><option>Mother</option><option>Father</option><option>Guardian</option></select></Field>
        <Field label="Phone"><input className="input-field" /></Field>
        <Field label="Email"><input className="input-field" type="email" /></Field>
        <Field label="Occupation"><input className="input-field" /></Field>
        <div style={{ gridColumn: '1 / -1' }}><Field label="Address"><input className="input-field" /></Field></div>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Children (select one or more)">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {STUDENTS.map(s => (
                <label key={s.id} style={{ display: 'flex', gap: 8, fontSize: 13, padding: 8, border: '1px solid var(--border)', borderRadius: 8 }}>
                  <input type="checkbox" checked={kids.includes(s.name)} onChange={() => setKids(k => k.includes(s.name) ? k.filter(x => x !== s.name) : [...k, s.name])} />
                  {s.name} · {s.class}
                </label>
              ))}
            </div>
          </Field>
        </div>
      </div>
    </Modal>
  )
}

export function ClassCreationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useApp()
  return (
    <Modal open={open} onClose={onClose} title="Create Class" size="md" footer={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={() => { toast('success', 'Class created successfully.'); onClose() }}>Create Class</button>
      </>
    }>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Class Name"><input className="input-field" placeholder="e.g. Grade 7A" /></Field>
        <Field label="Grade"><select className="input-field"><option>Grade 6</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option></select></Field>
        <Field label="Section"><select className="input-field"><option>A</option><option>B</option><option>C</option></select></Field>
        <Field label="Academic Year"><select className="input-field"><option>2025–2026</option></select></Field>
        <Field label="Class Teacher"><select className="input-field"><option>James Okonkwo</option><option>Angela Morrison</option><option>Carlos Mendez</option></select></Field>
        <Field label="Room"><input className="input-field" placeholder="201" /></Field>
        <Field label="Capacity"><input className="input-field" type="number" defaultValue={32} /></Field>
      </div>
    </Modal>
  )
}

export function CreateFeeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useApp()
  return (
    <Modal open={open} onClose={onClose} title="Create Fee" size="md" footer={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={() => { toast('success', 'Fee created successfully.'); onClose() }}>Save Fee</button>
      </>
    }>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Student"><select className="input-field">{STUDENTS.map(s => <option key={s.id}>{s.name}</option>)}</select></Field>
        <Field label="Fee Type"><select className="input-field"><option>Tuition</option><option>Activities</option><option>Lab Fee</option><option>Transport</option></select></Field>
        <Field label="Academic Year"><select className="input-field"><option>2025–2026</option></select></Field>
        <Field label="Amount"><input className="input-field" type="number" defaultValue={1200} /></Field>
        <Field label="Due Date"><input className="input-field" type="date" /></Field>
        <Field label="Discount"><input className="input-field" type="number" defaultValue={0} /></Field>
        <div style={{ gridColumn: '1 / -1' }}><Field label="Notes"><input className="input-field" /></Field></div>
      </div>
    </Modal>
  )
}

export function RecordPaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useApp()
  return (
    <Modal open={open} onClose={onClose} title="Record Payment" size="md" footer={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={() => { toast('success', 'Payment recorded successfully.'); onClose() }}>Save Payment</button>
      </>
    }>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Student"><select className="input-field">{STUDENTS.map(s => <option key={s.id}>{s.name}</option>)}</select></Field>
        <Field label="Invoice"><select className="input-field"><option>INV-2026-003</option><option>INV-2026-005</option><option>INV-2026-007</option></select></Field>
        <Field label="Amount"><input className="input-field" type="number" defaultValue={1350} /></Field>
        <Field label="Payment Method"><select className="input-field"><option>Cash</option><option>Bank</option><option>Mobile Money</option><option>Card</option></select></Field>
        <Field label="Payment Date"><input className="input-field" type="date" defaultValue="2026-08-16" /></Field>
        <Field label="Reference Number"><input className="input-field" defaultValue="TXN-88710" /></Field>
        <div style={{ gridColumn: '1 / -1' }}><Field label="Notes"><input className="input-field" /></Field></div>
      </div>
    </Modal>
  )
}
