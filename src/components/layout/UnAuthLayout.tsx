import { Outlet } from 'react-router-dom'

const UnAuthLayout = () => {
    return (
        <div className="">
            <Outlet />
        </div>
    )
}

export default UnAuthLayout
