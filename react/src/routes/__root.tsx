import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  ),
})
