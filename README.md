# 🐗 KanbanIO

A simple and responsive frontend only Kanban board.

## ✨ Features

- Create and remove columns with `Add Column` button and `Trash` icon button.
- Edit column's name by clicking on it.


- Create tasks by clicking on `+ New Task` button.
- Drag tasks from column to column and reorder them within current column.
    - ⚠️ There might be still a bug in Drag and Drop API, I'm currently looking into it.
- Edit task's name by clicking on its name in the column or in the detailed dialog.


- Click on the task card to open detailed view.
- Change task's name or description by clicking on the name or on pencil icon next to description.
- Add comments by typing in an input field and pressing Enter.
- Edit/Delete comments by using corresponding icons.

## ✨ Tech Stack

- 🧠 **State Management** with Zustand + Immer
- 💾 **Persistent Data** via localStorage with the help of Zustand's middleware
- 🎨 **Tailwind CSS** styling with **Lucide** icons
- 📝 **Autosizing Text Areas** using `react-textarea-autosize`
    - I used `react-textarea-autosize` because, frankly, I didn’t want to implement that myself 😄
- ⚡ Built with **Vite** for lightning-fast dev experience

## 🚀 Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/) installed globally

### Run Locally

```bash
pnpm install
pnpm run dev
```

This will start the Vite dev server on http://localhost:5173.


## 📄 License

MIT — feel free to use and modify.