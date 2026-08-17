import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Icon } from "./Icons"
import Modal from "./Modal"
import { EmptyState } from "./EmptyState"
import { useApp } from "../context/AppContext"

export interface Column<T> {
  key: string
  label: string
  render?: (row: T) => ReactNode
  width?: number | string
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  pageSize?: number
  actions?: (row: T) => ReactNode
  getId?: (row: T) => string
  emptyTitle?: string
  emptyMessage?: string
  emptyAction?: string
  onEmptyAction?: () => void
  onAdd?: () => void
  addLabel?: string
  filters?: ReactNode
  loading?: boolean
  exportName?: string
  previewTitle?: string
  previewColumns?: string[]
  allowDelete?: boolean
  onBulkDelete?: (ids: string[]) => void
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchPlaceholder = "Search...",
  searchKeys,
  pageSize: initialSize = 8,
  actions,
  getId,
  emptyTitle = "No records found",
  emptyMessage = "Try adjusting your search or filters.",
  emptyAction,
  onEmptyAction,
  filters,
  loading,
  exportName = "records",
  previewTitle,
  allowDelete,
  onBulkDelete,
}: DataTableProps<T>) {
  const { toast } = useApp()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialSize)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [hidden, setHidden] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [exportOpen, setExportOpen] =
    useState<"excel" | "pdf" | "print" | "preview" | null>(null)
  const [colsOpen, setColsOpen] = useState(false)
  const [exportScope, setExportScope] = useState<"page" | "all" | "filtered">(
    "filtered",
  )
  const [exportCols, setExportCols] = useState<string[]>(
    columns.map((c) => c.key),
  )
  const [busy, setBusy] = useState(false)

  const visibleCols = columns.filter((c) => !hidden.includes(c.key))

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter((row) => {
      const keys = searchKeys ?? (Object.keys(row) as (keyof T)[])
      return keys.some((k) =>
        String(row[k] ?? "")
          .toLowerCase()
          .includes(q),
      )
    })
  }, [data, search, searchKeys])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "")
      const bv = String(b[sortKey] ?? "")
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av)
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  const idOf = (row: T, i: number) => getId?.(row) ?? String(row.id ?? i)

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const simulateExport = (kind: "excel" | "pdf" | "print") => {
    setBusy(true)
    toast(
      "info",
      kind === "print"
        ? "Preparing print preview…"
        : `Preparing ${kind.toUpperCase()} file…`,
    )
    window.setTimeout(() => {
      setBusy(false)
      setExportOpen(null)
      toast(
        "success",
        kind === "excel"
          ? "Excel file generated successfully."
          : kind === "pdf"
            ? "PDF generated successfully."
            : "Print dialog ready.",
      )
    }, 900)
  }

  const allPageIds = paginated.map((r, i) => idOf(r, i))
  const allSelected =
    allPageIds.length > 0 && allPageIds.every((id) => selected.includes(id))

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 14,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
          <span className="search-icon">
            <Icon.Search />
          </span>
          <input
            className="input-field"
            style={{ paddingLeft: 36 }}
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
        </div>
        {filters}
        <button
          className="btn-secondary"
          onClick={() => setColsOpen((v) => !v)}
        >
          <Icon.Columns /> Columns
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            setExportCols(visibleCols.map((c) => c.key))
            setExportOpen("excel")
          }}
        >
          <Icon.Download /> Excel
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            setExportCols(visibleCols.map((c) => c.key))
            setExportOpen("pdf")
          }}
        >
          <Icon.File /> PDF
        </button>
        <button
          className="btn-secondary"
          onClick={() => setExportOpen("print")}
        >
          <Icon.Print /> Print
        </button>
        <button
          className="btn-secondary"
          onClick={() => setExportOpen("preview")}
        >
          <Icon.Eye /> Preview
        </button>
        <button
          className="btn-icon"
          title="Refresh"
          onClick={() => toast("info", "Data refreshed.")}
        >
          <Icon.Refresh />
        </button>
      </div>

      {colsOpen && (
        <div
          className="card"
          style={{
            padding: 12,
            marginBottom: 12,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {columns.map((c) => (
            <label
              key={c.key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--text-secondary)",
              }}
            >
              <input
                type="checkbox"
                checked={!hidden.includes(c.key)}
                onChange={() =>
                  setHidden((h) =>
                    h.includes(c.key)
                      ? h.filter((k) => k !== c.key)
                      : [...h, c.key],
                  )
                }
              />
              {c.label}
            </label>
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div
          className="card"
          style={{
            padding: "10px 14px",
            marginBottom: 12,
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            {selected.length} selected
          </span>
          <button
            className="btn-secondary"
            onClick={() => {
              setExportOpen("excel")
              toast("info", "Exporting selected rows…")
            }}
          >
            Export
          </button>
          <button
            className="btn-secondary"
            onClick={() => setExportOpen("print")}
          >
            Print
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              toast("success", `${selected.length} record(s) archived.`)
              setSelected([])
            }}
          >
            <Icon.Archive /> Archive
          </button>
          {allowDelete && (
            <button
              className="btn-danger"
              onClick={() => {
                onBulkDelete?.(selected)
                toast("success", "Selected records removed.")
                setSelected([])
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() =>
                      setSelected((s) =>
                        allSelected
                          ? s.filter((id) => !allPageIds.includes(id))
                          : [...new Set([...s, ...allPageIds])],
                      )
                    }
                  />
                </th>
                {visibleCols.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width, cursor: "pointer" }}
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.label}
                    {sortKey === col.key
                      ? sortDir === "asc"
                        ? " ↑"
                        : " ↓"
                      : ""}
                  </th>
                ))}
                {actions && <th style={{ width: 140 }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={visibleCols.length + 2} style={{ padding: 24 }}>
                    <div className="skeleton" style={{ height: 18 }} />
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={visibleCols.length + 2}>
                    <EmptyState
                      title={emptyTitle}
                      message={emptyMessage}
                      actionLabel={emptyAction}
                      onAction={onEmptyAction}
                    />
                  </td>
                </tr>
              ) : (
                paginated.map((row, i) => {
                  const id = idOf(row, i)
                  return (
                    <tr key={id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(id)}
                          onChange={() =>
                            setSelected((s) =>
                              s.includes(id)
                                ? s.filter((x) => x !== id)
                                : [...s, id],
                            )
                          }
                        />
                      </td>
                      {visibleCols.map((col) => (
                        <td key={col.key}>
                          {col.render
                            ? col.render(row)
                            : String(row[col.key] ?? "")}
                        </td>
                      ))}
                      {actions && <td>{actions(row)}</td>}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderTop: "1px solid var(--border-subtle)",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              color: "var(--text-muted)",
            }}
          >
            <span>
              Showing {sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, sorted.length)} of {sorted.length}{" "}
              {exportName}
            </span>
            <select
              className="input-field"
              style={{ width: 84, padding: "6px 8px" }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPage(1)
              }}
            >
              {[5, 8, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}/page
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              className="btn-icon"
              disabled={safePage === 1}
              onClick={() => setPage((p) => p - 1)}
              style={{ opacity: safePage === 1 ? 0.4 : 1 }}
            >
              <Icon.ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
              )
              .map((p, idx, arr) => (
                <span key={p} style={{ display: "flex", gap: 4 }}>
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span
                      style={{
                        padding: "0 4px",
                        color: "var(--text-muted)",
                        alignSelf: "center",
                      }}
                    >
                      …
                    </span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 7,
                      background:
                        p === safePage ? "var(--primary)" : "transparent",
                      color: p === safePage ? "white" : "var(--text-secondary)",
                      border:
                        p === safePage ? "none" : "1px solid var(--border)",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                </span>
              ))}
            <button
              className="btn-icon"
              disabled={safePage === totalPages}
              onClick={() => setPage((p) => p + 1)}
              style={{ opacity: safePage === totalPages ? 0.4 : 1 }}
            >
              <Icon.ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={exportOpen === "excel" || exportOpen === "pdf"}
        onClose={() => setExportOpen(null)}
        title={exportOpen === "excel" ? "Export Excel" : "Export PDF"}
        subtitle={`Export ${exportName}`}
        footer={
          <>
            <button
              className="btn-secondary"
              onClick={() => setExportOpen(null)}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={busy}
              onClick={() =>
                exportOpen &&
                simulateExport(exportOpen === "excel" ? "excel" : "pdf")
              }
            >
              {busy ? "Generating…" : "Generate file"}
            </button>
          </>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="field-label">Records</div>
          {([
            ["page", "Current page"],
            ["filtered", "Filtered records"],
            ["all", "All records"],
          ] as const).map(([key, label]) => (
            <label
              key={key}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                fontSize: 14,
              }}
            >
              <input
                type="radio"
                checked={exportScope === key}
                onChange={() => setExportScope(key)}
              />{" "}
              {label}
            </label>
          ))}
          <div className="field-label" style={{ marginTop: 8 }}>
            Columns
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {columns.map((c) => (
              <label
                key={c.key}
                style={{ display: "flex", gap: 8, fontSize: 13 }}
              >
                <input
                  type="checkbox"
                  checked={exportCols.includes(c.key)}
                  onChange={() =>
                    setExportCols((cols) =>
                      cols.includes(c.key)
                        ? cols.filter((k) => k !== c.key)
                        : [...cols, c.key],
                    )
                  }
                />
                {c.label}
              </label>
            ))}
          </div>
        </div>
      </Modal>

      <DocumentPreview
        open={exportOpen === "preview" || exportOpen === "print"}
        mode={exportOpen === "print" ? "print" : "pdf"}
        onClose={() => setExportOpen(null)}
        title={previewTitle ?? exportName}
        rows={filtered.slice(0, exportScope === "page" ? pageSize : 20)}
        columns={visibleCols.map((c) => c.label)}
        onDownload={() => simulateExport("pdf")}
        onPrint={() => simulateExport("print")}
      />
    </div>
  )
}

export function DocumentPreview({
  open,
  onClose,
  title,
  rows,
  columns,
  mode = "pdf",
  children,
  onDownload,
  onPrint,
}: {
  open: boolean
  onClose: () => void
  title: string
  rows?: Record<string, unknown>[]
  columns?: string[]
  mode?: "pdf" | "print"
  children?: ReactNode
  onDownload?: () => void
  onPrint?: () => void
}) {
  const { tenant, toast } = useApp()
  const [zoom, setZoom] = useState(0.85)
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: 980, width: "100%", maxHeight: "94vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
            gap: 8,
            flexWrap: "wrap",
            background: "var(--surface-2)",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontFamily: "Plus Jakarta Sans, sans-serif",
            }}
          >
            {mode === "print" ? "Print preview" : "PDF preview"} — {title}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button
              className="btn-secondary"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            >
              <Icon.ZoomOut /> Zoom out
            </button>
            <button
              className="btn-secondary"
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
            >
              <Icon.ZoomIn /> Zoom in
            </button>
            <button className="btn-secondary" onClick={() => setZoom(0.95)}>
              <Icon.Maximize /> Fit to width
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                onDownload?.()
                toast("success", "PDF generated successfully.")
              }}
            >
              <Icon.Download /> Download
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onPrint?.()
                window.print()
                toast("info", "Opening print dialog…")
              }}
            >
              <Icon.Print /> Print
            </button>
            <button className="btn-icon" onClick={onClose}>
              <Icon.X />
            </button>
          </div>
        </div>
        <div style={{ overflow: "auto", padding: 20, background: "#94a3b8" }}>
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
            }}
          >
            <div className="print-sheet">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "2px solid #2563eb",
                  paddingBottom: 12,
                  marginBottom: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 800,
                      fontSize: 22,
                      color: "#1d4ed8",
                    }}
                  >
                    Xanaano
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    School Management
                  </div>
                </div>
                <div
                  style={{ textAlign: "right", fontSize: 12, color: "#475569" }}
                >
                  <div style={{ fontWeight: 700, color: "#0f172a" }}>
                    {tenant.name}
                  </div>
                  <div>{tenant.address}</div>
                  <div>
                    {tenant.phone} · {tenant.email}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {new Date().toLocaleDateString()}
                </div>
              </div>
              {children ?? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                  }}
                >
                  <thead>
                    <tr>
                      {(columns ?? []).map((c) => (
                        <th
                          key={c}
                          style={{
                            textAlign: "left",
                            borderBottom: "1px solid #e2e8f0",
                            padding: "8px 6px",
                            color: "#475569",
                          }}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(rows ?? []).map((row, i) => (
                      <tr key={i}>
                        {(columns ?? []).map((c) => (
                          <td
                            key={c}
                            style={{
                              padding: "8px 6px",
                              borderBottom: "1px solid #f1f5f9",
                            }}
                          >
                            {String(Object.values(row)[0] ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div
                style={{
                  marginTop: 40,
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "#94a3b8",
                }}
              >
                <span>Generated by Xanaano</span>
                <span>Page 1 of 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
