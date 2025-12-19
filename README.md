1. How to run the project
# npm install
# npm run dev

Open your browser at:
# http://localhost:3000

2. State management & component structure
## State management
- Use React state (useState, useMemo). Avoid using external state management libraries unless the project requires it (e.g., Zustand, Redux, React Query).
- State is placed in page.tsx (container) to share between components:
  - products: product list (simulated API call)
  - search, category: for search & filter functionality
  - cart: stores the quantity of products by productId (can use useContext). The data displayed in CartSummary is derived from the original state—do not store duplicate data.

## Component structure
page.tsx: Container, coordinates data & state
ProductList: Displays the list of products, optimized using virtual scroll
ProductItem: Displays a single product + quantity input
CartSummary: Shows a summary of the order
SearchBar, CategoryFilter: Presentational UI components
hooks/: Contains reusable logic (fake API, debounce, virtual scroll)
This structure makes the code readable, maintainable, and easy to extend.

3. Notes on responsive design
## Mobile:
Single-column layout
Product list on top
Cart displayed at the bottom

## Desktop:
Two-column layout
Left: product list
Right: cart (Order Summary)

#Design priorities:
Clear and intuitive user experience
Keep the usage flow consistent between mobile and desktop
Reduce heavy DOM operations by only rendering items currently in the viewport

## Additional notes
Data is simulated to show loading state and UI disabling
Do not use external libraries for debounce or virtual scroll to demonstrate understanding of the internal mechanism
