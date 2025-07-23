import type { Attachment } from "svelte/attachments"

export function simpleSortable(): Attachment {
  return (element) => {
    const thead = element.querySelector("thead")
    if (!thead) {
      throw new Error("No <thead> found in the table")
    }
    const ths = thead.querySelectorAll("th")
    for (const th of ths) {
      th.addEventListener("click", () => {
        const table = th.closest("table")
        if (!table) return
        const tbody = table.querySelector("tbody")
        if (!tbody) return

        const rows = Array.from(tbody.querySelectorAll("tr"))
        const index = Array.from(ths).indexOf(th)
        const isAscending = th.classList.contains("ascending")

        rows.sort((a, b) => {
          const aText = a.children[index].textContent || ""
          const bText = b.children[index].textContent || ""
          return isAscending ? aText.localeCompare(bText) : bText.localeCompare(aText)
        })

        tbody.innerHTML = ""
        for (const row of rows) {
          tbody.appendChild(row)
        }

        th.classList.toggle("ascending", !isAscending)
        if (!th.textContent?.includes("▲") && !th.textContent?.includes("▼")) {
          th.textContent += isAscending ? " ▲" : " ▼"
        }
        th.textContent = (isAscending ? th.textContent?.replace(" ▲", " ▼") : th.textContent?.replace(" ▼", " ▲")) || ""
      })
    }
  }
}
